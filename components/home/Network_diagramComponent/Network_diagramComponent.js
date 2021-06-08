import { React, useEffect } from 'react'
// import { $, jQuery } from 'jquery';
import initJParticle from "./jparticle.jquery"
import $ from "jquery";
import "./Network_diagramComponent.css"






const draw_glope = () => {
    var globe = window.planetaryjs.planet();
    // Load our custom `autorotate` plugin; see below.
    globe.loadPlugin(autorotate(100));
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(window.planetaryjs.plugins.earth({
        topojson: { file: '/planetary/world-110m-withlakes.json' },
        oceans: { fill: '#CCE6EB' },
        land: { fill: '#26ADCB' },
        borders: { stroke: 'grey' }
    }));
    // Load our custom `lakes` plugin to draw lakes; see below.
    globe.loadPlugin(lakes({
        fill: '#26ADCB'
    }));
    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(window.planetaryjs.plugins.pings());
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.
    globe.loadPlugin(window.planetaryjs.plugins.zoom({
        scaleExtent: [100, 300]
    }));
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
    // Set up the globe's initial scale, offset, and rotation.
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

    // Every few hundred milliseconds, we'll draw another random ping.
    var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
    setInterval(function () {
        var lat = Math.random() * 170 - 85;
        var lng = Math.random() * 360 - 180;
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






export default function Network_diagramComponent(props) {
    initJParticle($)

    useEffect(() => {

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        const particles_number = Math.ceil(100 / 1520 * x);


        const jp = $("#network_div").jParticle({
            particlesNumber: particles_number, background: 'CCE6EB', color: 'white', createLinkDist: 180, speed: 200

        });

        draw_glope()
        return function cleanup() {


        };
    }, [])
    return (
        <div id="network_div" style={{
            position: 'relative', height: "608px", backgroundColor: "#CCE6EB", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}>
            <img style={{ width: "auto", height: "200px", position: 'absolute', filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25)) ' }} src={props.logo_img} id="c" alt="oval" />
            <div id="network_card" style={{ position: "absolute" }}>
                <div id="network_card_div">
                    <div id="network_card_text">connecting alumini around the world</div>
                    <div id="globe_wrapper">
                        <canvas id='rotatingGlobe' width='400' height='400'
                            style={{ width: '40px', height: '40px', cursor: 'move', marginRight: "15px" }}
                        >
                        </canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}
