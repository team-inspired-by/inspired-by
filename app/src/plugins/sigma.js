import Vue from "vue";
import * as sigma from "sigma";
import store from "../store";

export default {
    install(Vue) {
        Vue.prototype.$sigma = {
            test: true,
            sigma: sigma,
            create(id, topicList) {
                console.log(
                    "create executed.",
                    document.getElementById(id)
                );
                // Initialise sigma:
                var s = new sigma({
                    // renderer: {
                    //     container: document.getElementById(id),
                    //     type: "canvas",
                    //     camera: "init_cam"
                    // },
                    settings: {
                        edgeLabelSize: "proportional",
                        minArrowSize: 10,
                        defaultLabelColor: "rgba(255, 255, 255, 0.5)",
                        defaultLabelSize: 30,
                        // labelSize: "proportional",
                        font: "Finger Paint",
                        nodesPowRatio: 1,
                        edgeHoverSizeRatio: 1.5,
                        defaultHoverLabelBGColor: "transparent",
                        defaultLabelHoverColor: "#f7f473",
                        defaultNodeHoverColor: "#f7f473",
                        singleHover: true,
                        minNodeSize: 4,
                        doubleClickEnabled: false,
                        zoomMin: 0.2,
                        zoomMax: 0.5,
                    },
                });

                s.addCamera('init_cam');
                s.addRenderer({
                    container: document.getElementById(id),
                    camera: 'init_cam',
                });
                var graph = {
                    nodes: [],
                    edges: [],
                };

                var posX = [0.05, 0.2, 0.15, 0.4, 0.2, 0.25, 0.3];
                var posY = [0.2, 0.1, 0.05, 0.15, 0.2, 0.25, 0.15];

                for (let i in topicList) {
                    console.log("i: ", i)
                    graph.nodes.push({
                        id: i,
                        label: topicList[i].name,
                        x: posX[i],
                        y: posY[i],
                        color: "rgba(255, 255, 255, 0.5)",
                        size: Math.random() * 8,
                    })
                    if (i > 0)
                        graph.edges.push({
                            id: i,
                            label: "Edge " + i,
                            source: i - 1,
                            target: i,
                            color: "rgba(255, 255, 255, 0.22)",
                            type: "curvedArrow",
                        });


                }



                // Generate a random graph:
                // var nbNode = 50;
                // var nbEdge = 100;

                // var i;
                // for (i = 0; i < nbNode; i++)
                //     graph.nodes.push({
                //         id: i,
                //         label: "Node " + i,
                //         x: Math.random(),
                //         y: Math.random(),
                //         size: 1,
                //         color: "rgba(255, 255, 255, 0.5)",
                //     });

                // for (i = 0; i < nbEdge; i++)
                //     graph.edges.push({
                //         id: i,
                //         label: "Edge " + i,
                //         source: "" + ((Math.random() * nbNode) | 0),
                //         target: "" + ((Math.random() * nbNode) | 0),
                //         color: "rgba(255, 255, 255, 0.22)",
                //         type: "curvedArrow",
                //     });

                // load the graph
                s.graph.read(graph);

                s.cameras.init_cam.goTo({
                    x: 60,
                    y: 0.2,
                    ratio: 0.5
                });

                s.bind("clickNode", function (e) {
                    console.log('clicked: ', e);
                    store.commit("setTreeviewSelected", e.data.node.label);
                    s.cameras.init_cam.goTo({
                        x: e.data.node['read_caminit_cam:x'] + 30,
                        y: e.data.node['read_caminit_cam:y'],
                        ratio: 0.1,
                    });
                })
                s.bind("clickStage", function (e) {
                    console.log('clicked Stage: ', e);
                    store.commit("setTreeviewSelected", "");
                    s.cameras.init_cam.goTo({
                        x: 30,
                        y: 0.2,
                        ratio: 0.5,
                    });
                })
                // draw the graph
                s.refresh();
                // launch force-atlas for 5sec
                // s.startForceAtlas2();
            },
        };
    },
};