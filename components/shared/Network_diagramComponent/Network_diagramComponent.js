import { React, useEffect } from 'react'
// import { $, jQuery } from 'jquery';
import initJParticle from "./jparticle.jquery"
import $ from "jquery";
// import "./Network_diagramComponent.css"
// import { withRouter } from 'react-router-dom';

import { useRouter } from 'next/router'





const draw_glope = (screen_width) => {
    var globe = window.planetaryjs.planet();
    // Load our custom `autorotate` plugin; see below.
    globe.loadPlugin(autorotate(15));
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(window.planetaryjs.plugins.earth({
        topojson: { file: '/planetary/world-110m-withlakes.json' },
        oceans: { fill: '#edfbfd' },
        land: { fill: '#26ADCB' },
        borders: { stroke: 'white' }
    }));
    // Load our custom `lakes` plugin to draw lakes; see below.
    globe.loadPlugin(lakes({
        fill: '#26ADCB'
    }));
    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(window.planetaryjs.plugins.pings());
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.



    // globe.loadPlugin(window.planetaryjs.plugins.zoom({
    //     scaleExtent: [170, 170]
    // }));



    if (screen_width > 500) { // allow drag only on big screens
        globe.loadPlugin(window.planetaryjs.plugins.drag({
            // Dragging the globe should pause the
            // automatic rotation until we release the mouse.
            onDragStart: function () {
                this.plugins.autorotate.pause();
            },
            onDragEnd: function () {
                this.plugins.autorotate.resume();
            }
        }));
    }
    // Set up the globe's initial scale, offset, and rotation.
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

    // Every few hundred milliseconds, we'll draw another random ping.
    // var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
    var colors = ['white'];
    setInterval(function () {
        // var lat = Math.random() * 170 - 85;
        // var lng = Math.random() * 360 - 180;

        var lat = 29;
        var lng = 31.2;
        var color = colors[Math.floor(Math.random() * colors.length)];
        globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
    }, 150);

    var canvas = document.getElementById('rotatingGlobe');
    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    if (window.devicePixelRatio === 2) {
        canvas.width = 800;
        canvas.height = 800;
        let context = canvas.getContext('2d');
        context.scale(2, 2);
    }
    // Draw that globe!
    globe.draw(canvas);

    // This plugin will automatically rotate the globe around its vertical
    // axis a configured number of degrees every second.
    function autorotate(degPerSec) {
        // Planetary.js plugins are functions that take a `planet` instance
        // as an argument...
        return function (planet) {
            var lastTick = null;
            var paused = false;
            planet.plugins.autorotate = {
                pause: function () { paused = true; },
                resume: function () { paused = false; }
            };
            // ...and configure hooks into certain pieces of its lifecycle.
            planet.onDraw(function () {
                if (paused || !lastTick) {
                    lastTick = new Date();
                } else {
                    var now = new Date();
                    var delta = now - lastTick;
                    // This plugin uses the built-in projection (provided by D3)
                    // to rotate the globe each time we draw it.
                    var rotation = planet.projection.rotate();
                    rotation[0] += degPerSec * delta / 1000;
                    if (rotation[0] >= 180) rotation[0] -= 360;
                    planet.projection.rotate(rotation);
                    lastTick = now;
                }
            });
        };
    };

    // This plugin takes lake data from the special
    // TopoJSON we're loading and draws them on the map.
    function lakes(options) {
        options = options || {};
        var lakes = null;

        return function (planet) {
            planet.onInit(function () {
                // We can access the data loaded from the TopoJSON plugin
                // on its namespace on `planet.plugins`. We're loading a custom
                // TopoJSON file with an object called "ne_110m_lakes".
                var world = planet.plugins.topojson.world;
                lakes = window.topojson.feature(world, world.objects.ne_110m_lakes);
            });

            planet.onDraw(function () {
                planet.withSavedContext(function (context) {
                    context.beginPath();
                    planet.path.context(context)(lakes);
                    context.fillStyle = options.fill || 'black';
                    context.fill();
                });
            });
        };
    };
}




function Network_diagramComponent(props) {
    const router = useRouter()

    initJParticle($)
    useEffect(() => {

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        const particles_number = Math.ceil(150 / 1520 * x);

        if (x > 500) {
            const jp = $("#network_div").jParticle({
                particlesNumber: particles_number, background: 'CCE6EB', color: 'white', createLinkDist: 120, speed: 66

            });
        }

        draw_glope(x)
        return function cleanup() {


        };
    }, [])
    return (
        <div id="network_div" style={{
            position: 'relative', width: '100%', height: "608px", backgroundColor: "#CCE6EB", display: "flex", justifyContent: "center",
            display: router.pathname !== "/" ? "none" : "flex",
            alignItems: "center", boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}>

            <div id="globe_wrapper" style={{}}>
                <canvas id='rotatingGlobe' width='350' height='350'
                    style={{ width: '250px', height: '250px', cursor: 'move' }}
                >
                </canvas>
                <img style={{ width: "auto", height: "110px", position: 'absolute', filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25)) ', bottom: '10px', right: "20px" }} src={'/logo.png'} id="c" alt="oval" />
            </div>

            <div id="network_card" style={{}}>
                <div id="network_card_div">
                    <div id="network_card_text">connecting ZC Alumni around the world</div>

                </div>
            </div>
        </div>
    )
}


export default Network_diagramComponent;