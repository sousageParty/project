function View(selector) {

    var scene = new THREE.Scene();//создаем сцену
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);//настраиваем камеру
    var renderer = new THREE.WebGLRenderer();//подключаем рендер
    var controls = new THREE.OrbitControls(camera, renderer.domElement);//добавляем  контроллер(вращение, скаллинг)
    var spotLight = new THREE.SpotLight(0xffffff);//добавляем свет
    var sphere, material;
    var meshes = [];//массив планет
    var koords = {};

    function getRast(oldPlanet, newPlanet) {//вычисляем расстояние между планетами чтобы не было налегания друг на друга при рисовании
        var x = oldPlanet.position.x - newPlanet.center.x;
        var y = oldPlanet.position.y - newPlanet.center.y;
        var z = oldPlanet.position.z - newPlanet.center.z;
        var rast = Math.sqrt(x * x + y * y + z * z);
        return (rast <= oldPlanet.radius + newPlanet.radius) ? false : true;//можно сделать с зазором в виде удвоенного радиуса новой планеты
    }

    function clearScene() {
        if (meshes.length > 0)
            for (var i = 0; i < meshes.length; i++)
                scene.remove(meshes[i])
        meshes = [];
    }

    this.createPlanet = function (planet) {
        //console.log(planet);
        scene.remove(meshes[1]);
        meshes.splice(1, 1);
        createSphere(planet.id, planet.radius, planet.position, planet.color, planet.speed);
    };

    this.createPlanets = function (planets) {
        clearScene();
        for (var key in planets) {
            createSphere(planets[key].id, planets[key].radius, planets[key].position, planets[key].face, planets[key].speed);
        }
    };

    this.updateScene = function (planets) {
        var result;
        //console.log(planets);
        for (var key in planets) {
            var planet = planets[key];
            result = meshes.find(function (mesh) { return mesh.name === planet.id; });
            if (!(result))
                createSphere(planet.id, planet.radius, planet.position, planet.color, planet.speed);
            koords[planet.id] = { id: planet.id, x: planet.position.x, y: planet.position.y };
        }
    };

    function createSphere(id, radius, position, color, _speed) {
        //console.log(id, radius, position, color, _speed);
        sphere = new THREE.SphereGeometry(radius, radius, radius);
        material = new THREE.MeshLambertMaterial({ color: color, wireframe: true });
        var texture = new THREE.Mesh(sphere, material);
        texture.castShadow = true;
        texture.position.x = position.x;
        texture.position.y = position.y;
        texture.position.z = position.z;
        texture.rad = radius;
        texture.speed = _speed;
        texture.name = id;
        scene.add(texture);
        meshes.push(texture);
        animate();
    }

    function render() {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].rotation.y += (meshes[i].speed) ? meshes[i].speed : 0.0002;
            if (!($.isEmptyObject(koords)) && koords[meshes[i].name]) {
                meshes[i].position.x = koords[meshes[i].name].x;
                meshes[i].position.z = koords[meshes[i].name].y;
            }
        }
        spotLight.position.set(camera.position.x, camera.position.y, camera.position.z);//ставим свет
        renderer.setSize(selector.width(), selector.height());//устанавливаем размеры канваса
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        controls.update();
    }

    function init() {
        scene.background = new THREE.Color("gray");
        camera.position.set(0, 0, 2000);//ставим камеру
        spotLight.position.set(camera.position.x, camera.position.y, camera.position.z);//ставим свет
        scene.add(spotLight);//добавляем свет
        createSphere('sun', 100, { x: 0, y: 0, z: 0 }, "yellow");
        //animate();//включаем анимацию
        //renderer.setSize(selector.width(), selector.height());//устанавливаем размеры канваса
        selector.empty();
        selector.append(renderer.domElement);//добавляем канвас в документ
        renderer.render(scene, camera);//рисуем в канвасе
    }

    init();
}