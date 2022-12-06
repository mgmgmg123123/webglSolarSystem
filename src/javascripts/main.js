import * as THREE from 'three';
// import * as THREE from "/node_modules/three/build/three.module.js"

window.addEventListener('DOMContentLoaded', init);

function init() {

    // 定数の設定 ///////////////////////////////////////
    let deg = 0;
    let mouseX = 0;
    let rot = 0;
    const cameraPosition = 500;

    // 断面円分割、芯円分割
    const sectionCircleDivision = 2;
    const coreCircleDivision = 1000;

    // 太陽系の定数
    const coefficient = 5;
    const orbitThickness = coefficient * 0.01;

    // 太陽半径  太陽大きすぎなので1/10にしてみる
    // const radiusSun = 70;
    const radiusSun = coefficient * 70 / 10;
    // 水星 Mercury
    const radiusMercury = coefficient * 0.3;
    const distanceMercury = coefficient * (radiusSun + radiusMercury + 3);

    // 金星 Venus
    const radiusVenus = coefficient * 0.6;
    const distanceVenus = coefficient * (radiusSun + radiusVenus + 5);

    // 地球 Earth
    const radiusEarth = coefficient * 0.6;
    const distanceEarth = coefficient * (radiusSun + radiusEarth + 7.5);

    // 火星 Mars
    const radiusMars = coefficient * 0.4;
    const distanceMars = coefficient * (radiusSun + radiusMars + 11.5);

    // 木星 Jupiter
    const radiusJupiter = coefficient * 7;
    const distanceJupiter = coefficient * (radiusSun + radiusJupiter + 39);

    // 土星 Saturn
    const radiusSaturn = coefficient * 6;
    const distanceSaturn = coefficient * (radiusSun + radiusSaturn + 70);
    // 芯円半径、断面円半径、断面円分割、芯円分割
    const centerCircleRadiusSaturn = radiusSaturn * 1.5;
    const crossSectionalCircleRadiusSaturn = radiusSaturn * 0.3;
    // const sectionCircleDivisionSaturn = 2;
    // const coreCircleDivisionSaturn = 1000;

    // 天王星 Uranus
    const radiusUranus = coefficient * 2.5;
    const distanceUranus = coefficient * (radiusSun + radiusUranus + 145);
    // 芯円半径、断面円半径、断面円分割、芯円分割
    const centerCircleRadiusUranus = radiusUranus * 1.2;
    const crossSectionalCircleRadiusUranus = radiusUranus * 0.2;
    // const sectionCircleDivisionUranus = 2;
    // const coreCircleDivisionUranus = 1000;

    // 海王星 Neptune
    const radiusNeptune = coefficient * 0.4;
    const distanceNeptune = coefficient * (radiusSun + radiusNeptune + 11.5);

    // 冥王星 Pluto
    const radiusPluto = coefficient * 2.5;
    const distancePluto = coefficient * (radiusSun + radiusPluto + 225);

    //////////////////////////////////////////////////////////


    // シーン生成
    const scene = new THREE.Scene();
    // カメラの設定
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );
    camera.position.y = cameraPosition;
    // カメラコントローラーを作成
    // const controls = new THREE.OrbitControls(camera, document.body);

    // 滑らかにカメラコントローラーを制御するÚ
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.2;


    // レンダラー作成
    const renderer = new THREE.WebGLRenderer({ alfa: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // const composer = new EffectComposer(renderer);

    document.addEventListener("mousemove", (event) => {
        mouseX = event.pageX;
    });

    // 太陽
    const sunGeometry = new THREE.SphereGeometry(radiusSun, 32, 16);
    const sunMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/sunmap.jpg')
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);


    // 水星 Mercury
    const mercuryGeometry = new THREE.SphereGeometry(radiusMercury, 32, 16);
    const mercuryMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/mercurymap.jpg')
    });
    const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    scene.add(mercury);

    // 金星 Venus
    const venusGeometry = new THREE.SphereGeometry(radiusVenus, 32, 16);
    const venusMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/venusmap.jpg')
    });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    scene.add(venus);


    // 地球 Earth
    const earthGeometry = new THREE.SphereGeometry(radiusEarth, 32, 16);
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/earthmap1k.jpg')
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);


    // 火星 Mars
    const marsGeometry = new THREE.SphereGeometry(radiusMars, 32, 16);
    const marsMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/mars_1k_color.jpg')
    });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);


    // 木星 Jupiter
    const jupiterGeometry = new THREE.SphereGeometry(radiusJupiter, 32, 16);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/jupitermap.jpg')
    });
    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    scene.add(jupiter);


    // 土星 Saturn
    const saturnGeometry = new THREE.SphereGeometry(radiusSaturn, 32, 16);
    const saturnMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/saturnmap.jpg')
    });
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    scene.add(saturn);

    const saturnRing = new THREE.Mesh(
        new THREE.TorusGeometry(centerCircleRadiusSaturn, crossSectionalCircleRadiusSaturn, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('../images/saturnringcolor.jpg'),
            opacity: 0.7
        })
    );
    scene.add(saturnRing);


    // 天王星 Uranus
    const uranusGeometry = new THREE.SphereGeometry(radiusUranus, 32, 16);
    const uranusMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/uranusmap.jpg')
    });
    const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
    scene.add(uranus);
    const uranusRing = new THREE.Mesh(
        new THREE.TorusGeometry(centerCircleRadiusUranus, crossSectionalCircleRadiusUranus, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('../images/uranusringcolour.jpg'),
            opacity: 0.7
        })
    );
    scene.add(uranusRing);


    // 海王星 Neptune
    const neptuneGeometry = new THREE.SphereGeometry(radiusNeptune, 32, 16);
    const neptuneMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/neptunemap.jpg')
    });
    const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    scene.add(neptune);


    // 冥王星 Pluto
    const plutoGeometry = new THREE.SphereGeometry(radiusPluto, 32, 16);
    const plutoMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../images/plutomap1k.jpg')
    });
    const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);
    scene.add(pluto);


    // 星々の作成
    function createStarField() {
        // 頂点情報を格納する配列
        const vertices = [];
        // 1000 個の頂点を作成
        for (let i = 0; i < 3000; i++) {
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        // 形状データを作成
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            size: 3,
            color: 0xffffff,
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }
    createStarField();

    // 図形の作成 ////////////////////////////////////
    // xyzの軸を作成
    const material1 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const material2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const material3 = new THREE.LineBasicMaterial({ color: 0xff00ff });

    const points1 = [];
    points1.push(new THREE.Vector3(-100, 0, 0));
    points1.push(new THREE.Vector3(100, 0, 0));
    const points2 = [];
    points2.push(new THREE.Vector3(0, -100, 0));
    points2.push(new THREE.Vector3(0, 100, 0));
    const points3 = [];
    points3.push(new THREE.Vector3(0, 0, -100));
    points3.push(new THREE.Vector3(0, 0, 100));

    const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
    const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);

    const line1 = new THREE.Line(geometry1, material1);
    const line2 = new THREE.Line(geometry2, material2);
    const line3 = new THREE.Line(geometry3, material3);

    // scene.add(line1, line2, line3);
    // 太陽系の軌道線の作成 ////////////////////////////////////
    const orbitMercury = new THREE.Mesh(
        new THREE.TorusGeometry(distanceMercury, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitMercury.rotation.set(Math.PI / 2, 0, 0);

    const orbitVenus = new THREE.Mesh(
        new THREE.TorusGeometry(distanceVenus, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitVenus.rotation.set(Math.PI / 2, 0, 0);

    const orbitEarth = new THREE.Mesh(
        new THREE.TorusGeometry(distanceEarth, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitEarth.rotation.set(Math.PI / 2, 0, 0);

    const orbitMars = new THREE.Mesh(
        new THREE.TorusGeometry(distanceMars, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitMars.rotation.set(Math.PI / 2, 0, 0);

    const orbitJupiter = new THREE.Mesh(
        new THREE.TorusGeometry(distanceJupiter, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitJupiter.rotation.set(Math.PI / 2, 0, 0);

    const orbitSaturn = new THREE.Mesh(
        new THREE.TorusGeometry(distanceSaturn, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitSaturn.rotation.set(Math.PI / 2, 0, 0);

    const orbitUranus = new THREE.Mesh(
        new THREE.TorusGeometry(distanceUranus, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitUranus.rotation.set(Math.PI / 2, 0, 0);

    const orbitNeptune = new THREE.Mesh(
        new THREE.TorusGeometry(distanceNeptune, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitNeptune.rotation.set(Math.PI / 2, 0, 0);

    const orbitPluto = new THREE.Mesh(
        new THREE.TorusGeometry(distancePluto, orbitThickness, sectionCircleDivision, coreCircleDivision),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    orbitPluto.rotation.set(Math.PI / 2, 0, 0);

    scene.add(orbitMercury, orbitVenus, orbitEarth, orbitMars, orbitJupiter, orbitSaturn, orbitUranus, orbitNeptune, orbitPluto);


    // アンビエントライト作成
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
    ambientLight.position.set(1, 1, 1);
    const pointLight = new THREE.PointLight(0xFFFFFF, 1, 0, 0.01);
    pointLight.position.set(0, 0, 0);
    // シーンに追加
    scene.add(ambientLight, pointLight);

    // 照明ヘルパー
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);

    function animate() {
        requestAnimationFrame(animate);

        // マウスの位置に応じて角度を設定
        // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
        const targetRot = (mouseX / window.innerWidth) * 360;
        // イージングの公式を用いて滑らかにする
        // 値 += (目標値 - 現在の値) * 減速値
        rot += (targetRot - rot) * 0.02;

        // ラジアンに変換する
        const radian = rot * Math.PI / 180;
        // 角度に応じてカメラの位置を設定
        camera.position.x = cameraPosition * Math.sin(radian);
        camera.position.z = cameraPosition * Math.cos(radian);
        // console.log(camera.position.x, camera.position.z);
        // 原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        sun.rotation.x = sun.rotation.x + 0.01;
        sun.rotation.y += 0.01;

        deg++;
        mercury.rotation.x = mercury.rotation.x + 0.01;
        mercury.rotation.y += 0.01;
        mercury.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceMercury);
        mercury.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceMercury);

        venus.rotation.x = venus.rotation.x + 0.01;
        venus.rotation.y += 0.01;
        venus.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceVenus);
        venus.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceVenus);

        earth.rotation.x = earth.rotation.x + 0.01;
        earth.rotation.y += 0.01;
        earth.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceEarth);
        earth.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceEarth);

        mars.rotation.x = mars.rotation.x + 0.01;
        mars.rotation.y += 0.01;
        mars.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceMars);
        mars.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceMars);

        jupiter.rotation.x = jupiter.rotation.x + 0.01;
        jupiter.rotation.y += 0.01;
        jupiter.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceJupiter);
        jupiter.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceJupiter);

        saturn.rotation.x = saturn.rotation.x + 0.01;
        saturn.rotation.y += 0.01;
        saturn.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceSaturn);
        saturn.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceSaturn);
        saturnRing.position.x = saturn.position.x;
        saturnRing.position.y = saturn.position.y;
        saturnRing.position.z = saturn.position.z;

        uranus.rotation.x = uranus.rotation.x + 0.01;
        uranus.rotation.y += 0.01;
        uranus.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceUranus);
        uranus.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceUranus);
        uranusRing.position.x = uranus.position.x;
        uranusRing.position.y = uranus.position.y;
        uranusRing.position.z = uranus.position.z;

        neptune.rotation.x = neptune.rotation.x + 0.01;
        neptune.rotation.y += 0.01;
        neptune.position.x = (Math.cos(deg * (Math.PI / 180)) * distanceNeptune);
        neptune.position.z = (Math.sin(deg * (Math.PI / 180)) * distanceNeptune);

        pluto.rotation.x = neptune.rotation.x + 0.01;
        pluto.rotation.y += 0.01;
        pluto.position.x = (Math.cos(deg * (Math.PI / 180)) * distancePluto);
        pluto.position.z = (Math.sin(deg * (Math.PI / 180)) * distancePluto);

        // カメラコントローラーを更新
        // controls.update();
        renderer.render(scene, camera);
        // composer.render();
    }

    animate();

}

