function View(selector) {

    var scene = new THREE.Scene();//создаем сцену
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);//настраиваем камеру
    var renderer = new THREE.WebGLRenderer();//подключаем рендер
    var controls = new THREE.OrbitControls(camera, renderer.domElement);//добавляем  контроллер(вращение, скаллинг)
    var spotLight = new THREE.SpotLight(0xffffff);//добавляем свет
    var sphere, material;
    var meshes = {
        planets: [],//массив планет
        rockets: []
    };
    var koords = {};

    function getRast(oldPlanet, newPlanet) {//вычисляем расстояние между планетами чтобы не было налегания друг на друга при рисовании
        var x = oldPlanet.position.x - newPlanet.center.x;
        var y = oldPlanet.position.y - newPlanet.center.y;
        var z = oldPlanet.position.z - newPlanet.center.z;
        var rast = Math.sqrt(x * x + y * y + z * z);
        return (rast <= oldPlanet.radius + newPlanet.radius) ? false : true;//можно сделать с зазором в виде удвоенного радиуса новой планеты
    }

    function clearScene() {
        if (meshes.planets.length > 0 || meshes.rockets.length > 0)
            for (var i = 0; i < meshes.planets.length; i++) {
                scene.remove(meshes.planets[i]);
                scene.remove(meshes.rockets[i]);
            }
        meshes = { planets: [], rockets: [] };
    }

    this.createPlanet = function (planet) { // в тестовом экране
        scene.remove(meshes.planets[1]);
        meshes.planets.splice(1, 1);
        createSphere(planet.id, planet.radius, planet.position, planet.color, planet.speed, planet.mass);
    };

    this.createRockets = function (rockets) {
        for (var key in rockets) {
            var rocket = rockets[key];
            createRocket(rocket.id, rocket.planetId, rocket.position, rocket.face, rocket.mass, rocket.speed);
        }
    };

    this.createPlanets = function (planets) { // в основном экране
        clearScene();
        for (var key in planets) {
            createSphere(planets[key].id, planets[key].radius, planets[key].position, planets[key].face, planets[key].speed);
        }
    };

    this.updateScene = function (scene) {
        var result;
        //console.log(scene.planets);
        var planets = scene.planets;
        for (var key in planets) {
            var planet = planets[key];
            result = meshes.planets.find(function (mesh) { return mesh.name === planet.id; });
            if (!(result))
                createSphere(planet.id, planet.radius, planet.position, planet.color, planet.speed, planet.mass);
            koords[planet.id] = { id: planet.id, x: planet.position.x, y: planet.position.y };
        }
        if (scene.rockets) {
            var rockets = scene.rockets;
            for (var key in rockets) {
                var rocket = rockets[key];
                result = meshes.rockets.find(function (mesh) { return mesh.name === rocket.id; });
                if (!(result))
                    createSphere(rocket.id, rocket.planetId, rocket.position, rocket.color, rocket.mass, rocket.speed);
                koords[rocket.id] = { id: rocket.id, x: rocket.position.x, y: rocket.position.y };
            }
        }
    };

    function createSphere(id, radius, position, color, _speed, mass) {
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
        texture.mass = mass;
        texture.name = id;
        scene.add(texture);
        meshes.planets.push(texture);
        animate();
    }

    function createRocket(id, planetId, position, color, mass, speed) {
        console.log(id, planetId, position, color, mass, speed);
        var radius = 10;
        sphere = new THREE.SphereGeometry(radius, radius, radius);
        material = new THREE.MeshLambertMaterial({ color: color, wireframe: true });
        var texture = new THREE.Mesh(sphere, material);
        texture.castShadow = true;
        texture.position.x = position.x;
        texture.position.y = position.y;
        texture.position.z = position.z;
        texture.rad = radius;
        texture.speed = speed;
        texture.mass = mass;
        texture.name = id;
        texture.planet = planetId;
        scene.add(texture);
        meshes.rockets.push(texture);
        animate();
    }

    function render() {
        for (var i = 0; i < meshes.planets.length; i++) {
            var planet = meshes.planets[i];
            planet.rotation.y += (planet.speed) ? planet.speed : 0.0002;
            if (!($.isEmptyObject(koords)) && koords[planet.name]) {
                planet.position.x = koords[planet.name].x;
                planet.position.z = koords[planet.name].y;
            }
        }
        for (var i = 0; i < meshes.rockets.length; i++) {
            var rocket = meshes.rockets[i];
            if (!($.isEmptyObject(koords)) && koords[rocket.name]) {
                rocket.position.x = koords[rocket.name].x;
                rocket.position.z = koords[rocket.name].y;
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