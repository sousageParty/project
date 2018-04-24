function View(selector, flag) {

    var scene = new THREE.Scene();//создаем сцену
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);//настраиваем камеру
    var renderer = new THREE.WebGLRenderer();//подключаем рендер
    var controls = new THREE.OrbitControls(camera, renderer.domElement);//добавляем  контроллер(вращение, скаллинг)
    var spotLight = new THREE.SpotLight(0xffffff);//добавляем свет
    var time = 0;
    var sphere, material;
    var meshes = [];//массив планет

    function getRast(oldPlanet, newPlanet) {//вычисляем расстояние между планетами чтобы не было налегания друг на друга при рисовании
        var x = oldPlanet.position.x - newPlanet.center.x;
        var y = oldPlanet.position.y - newPlanet.center.y;
        var z = oldPlanet.position.z - newPlanet.center.z;
        var rast = Math.sqrt(x * x + y * y + z * z);
        return (rast <= oldPlanet.radius + newPlanet.radius) ? false : true;//можно сделать с зазором в виде удвоенного радиуса новой планеты
    }

    function getKoef(min, max) {
        return Math.random() * (max - min) + min;
    }

    function clearScene() {
        for (var i = 0; i < meshes.length; i++)
            scene.remove(meshes[i])
        meshes = [];
    }

    this.createPlanet = function (radius, center, color, speed) {
        //console.log(radius, center, color, speed);
        /*for (var i = 0; i < meshes.length; i++) {
            var elem = meshes[i];
            if (!(getRast(elem, { radius: radius, center: center }))) {
                return "Отодвиньте планету или уменьшите её!";
            }
        }*/
        createSphere(radius, center, color, speed);
    };

    this.createPlanets = function (planets) {
        clearScene();
        for (var key in planets) {
            createSphere(planets[key].radius, planets[key].position, planets[key].face, planets[key].speed);
        }
    };

    function createSphere(radius, center, color, _speed) {
        console.log(radius, center, color, _speed);
        sphere = new THREE.SphereGeometry(radius, radius, radius);
        material = new THREE.MeshLambertMaterial({ color: color, wireframe: true });
        var texture = new THREE.Mesh(sphere, material);
        texture.castShadow = true;
        texture.position.set(center.x, center.y, center.z);
        texture.radius = radius;
        texture.speed = _speed;
        texture.koef = getKoef(0.1, 0.5);
        //console.log(texture.position);
        scene.add(texture);
        meshes.push(texture);
        animate();
    }

    function init() {
        scene.background = new THREE.Color("gray");
        camera.position.set(0, 0, 2000);//ставим камеру
        spotLight.position.set(camera.position.x, camera.position.y, camera.position.z);//ставим свет
        scene.add(spotLight);//добавляем свет
        animate();//включаем анимацию
        //renderer.setSize(selector.width(), selector.height());//устанавливаем размеры канваса
        selector.empty();
        selector.append(renderer.domElement);//добавляем канвас в документ
        renderer.render(scene, camera);//рисуем в канвасе
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        controls.update();
    }

    function render() {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].rotation.y += (meshes[i].speed) ? meshes[i].speed : 0.0002;
        }
        spotLight.position.set(camera.position.x, camera.position.y, camera.position.z);//ставим свет
        renderer.setSize(selector.width(), selector.height());//устанавливаем размеры канваса
        renderer.render(scene, camera);
    }

    init();
}