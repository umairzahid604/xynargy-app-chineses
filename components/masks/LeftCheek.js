import { useEffect, useRef } from 'react';
import json from "./example.json"
export const LeftCheekMask = ({ algo_tech_name, imageData }) => {
    const svgHolder = useRef(undefined)
    const imageHolder = useRef(undefined)
    const groupHolder = useRef(undefined)
    const polygonsHolder = useRef(undefined)



    //Mask colors
    const maskColors = [
        {
            names: [
                'translucency',
                'translucency_mask_origin',
                'translucency_mask'
            ],
            styles: {
                'fill': 'rgba(84,255,255,1)'
            }
        },
        {
            names: [
                'wrinkles',
                'wrinkles_polygon_mask_original',
                'wrinkles_polygon_mask_restored',
            ],
            styles: {
                'fill': 'rgba(255,255,255,0.7)'
            }
        },
        {
            names: [
                'wrinkles_polyline_mask_original',
                'wrinkles_polyline_mask_restored'
            ],
            styles: {
                'fill': 'none',
                'stroke': 'rgba(255,255,255,0.7)'
            }
        },
        {
            names: [
                'pigmentation',
                'pigmentation_mask_origin',
                'pigmentation_mask'
            ],
            styles: {
                'fill': 'rgba(42,16,74,0.5)'
            }
        },
        {
            names: [
                'acne',
                'acne_mask_origin',
                'acne_mask'
            ],
            styles: {
                'fill': 'rgba(255,0,0,0.5)'
            }
        },
        {
            names: [
                'dark_circles',
                'dark_circles_original_mask',
                'dark_circles_mask'
            ],
            styles: {
                'fill': 'rgba(252,255,84,0.5)'
            }
        },
        {
            names: [
                'eye_bags',
                'eye_bags_original',
                'eye_bags_mask'
            ],
            styles: {
                'fill': 'rgba(252,255,84,0.5)'
            }
        },
        {
            names: [
                'lacrimal_grooves',
                'lacrimal_grooves_original_mask',
                'lacrimal_grooves_mask'
            ],
            styles: {
                'fill': 'rgba(255,255,255,0.7)'
            }
        },
        {
            names: [
                'pores',
                'pores_mask_original',
                'pores_mask'
            ],
            styles: {
                'fill': 'rgba(1,11,102,0.5)'
            }
        },
        {
            names: [
                'redness',
                'redness_mask_original',
                'redness_mask'
            ],
            styles: {
                'fill': 'rgba(255,80,164,1)'
            }
        },
        {
            names: [
                'dehydration',
                'dehydration_mask_original',
                'dehydration_mask'
            ],
            styles: {
                'filter': 'blur(4px)'
            },
            bigStyles: {
                'filter': 'blur(3px)'
            },
            middleStyles: {
                'filter': 'blur(1.5px)'
            },
            smallStyles: {
                'filter': 'blur(0.5px)'
            },
            ranges: [
                {
                    range: [0, 10], value: '#c5c5a0'
                },
                {
                    range: [11, 20], value: '#c5c395'
                },
                {
                    range: [21, 30], value: '#c6c082'
                },
                {
                    range: [31, 40], value: '#c6ba64'
                },
                {
                    range: [41, 50], value: '#c7b548'
                },
                {
                    range: [51, 60], value: '#c8a74c'
                },
                {
                    range: [61, 70], value: '#ca8c52'
                },
                {
                    range: [71, 80], value: '#cb7859'
                },
                {
                    range: [81, 90], value: '#cd6d5d'
                },
                {
                    range: [91, 100], value: '#ce5663'
                }
            ]
        },
        {
            names: [
                'sagging',
                'sagging_mask_original',
                'sagging_mask_restored'
            ],
            styles: {
                'fill': 'none',
                'stroke': 'rgba(192, 223, 126, 1)',
                'stroke-width': '2.5px'
            }
        },
        {
            names: [
                'fine_lines_mask',
                'fine_lines_mask_original',
                'fine_lines_mask_restored'
            ],
            styles: {
                'fill': 'none',
                'stroke': 'rgba(255, 0, 122, 0.9)',
                'stroke-width': '2.5px'
            }
        },
        {
            names: [
                'deep_lines_mask',
                'deep_lines_mask_original',
                'deep_lines_mask_restored'
            ],
            styles: {
                'fill': 'rgba(7, 221, 67, 0.7)',
            }
        },
        {
            names: [
                'mustache_mask',
                'mustache_mask_original',
            ],
            styles: {
                'fill': 'rgba(95,214,66,0.7)',
            }
        },
        {
            names: [
                'beard_mask',
                'beard_mask_original',
            ],
            styles: {
                'fill': 'rgba(0,206,95,0.6)',
            }
        },
        {
            names: [
                'stubble_mask',
                'stubble_mask_original',
            ],
            styles: {
                'fill': 'rgba(210,255,203,0.7)',
            }
        },
        {
            names: [
                'unshaven_mask',
                'unshaven_mask_original',
            ],
            styles: {
                'fill': 'rgba(116,255,104,0.3)',
            }
        }
    ];

    const mask = json.find(el => el?.result?.algorithm_tech_name === algo_tech_name)
    //main face clipping mask
    const maskMain = json.find(el => el?.result?.algorithm_tech_name === 'front_face_areas');

    useEffect(() => {

        // imageHolder.current.setAttribute('href', `data:image/png;base64,${imageData}`);
        imageHolder.current.setAttribute('href', imageData);

        // //generate masks
        // if (mask?.result?.masks_restored?.length) {
        //     mask.result.masks_restored.forEach(el => {
        //         generate(el, svgHolder.current);
        //     });
        // }


        //generate main mask to crop
        if(maskMain?.result?.masks_restored?.length){

        	//Hide parts of face if needed: 
        	//forehead
        	//left_cheek
        	//right_cheek
        	//nose
        	//chin
        	//left_eye_area
        	//right_eye_area
        	
            const maskMainRestored = maskMain.result.masks_restored.filter(el=>{
        		
                // return el.tech_name !== 'left_eye_area' && el.tech_name !== 'right_eye_area' 
        		return el.tech_name === "left_cheek"

        	});
            
            //generate
        	
            maskMainRestored.forEach(el => {
        		generate(el, svgHolder.current, true,el.tech_name);
        	});
        
            


            

        	
        }


        function objectGenerate(type, c, group) {
            let object = null;
            //Polygon
            if (type === 'MultiPolygon') {
                object = group.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
                object.setAttribute("points", c[0]);
                object.setAttribute('vector-effect', true);
                object.setAttribute('non-scaling-stroke', true);

            }
            //Point
            if (type === 'MultiPoint') {
                object = group.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "circle"));
                object.setAttribute("cx", c[0]);
                object.setAttribute("cy", c[1]);
                object.setAttribute("r", c[2]);
                object.setAttribute('vector-effect', true);
                object.setAttribute('non-scaling-stroke', true);
            }
            //MultiLineString
            if (type === 'MultiLineString') {
                object = group.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "polyline"));
                object.setAttribute("points", c);
                object.setAttribute('vector-effect', true);
                object.setAttribute('non-scaling-stroke', true);
            }
            return object;
        }

        function generate(DATA, svg, crop = false) {
            //Set viewBox
            if (svg == null) return
            svg.setAttribute("viewBox", DATA.view_box);

            //Styles for different size of image
            const boxWidth = DATA.view_box.split(' ')[2];
            const maskColor = maskColors.find(
                mask => mask.names.indexOf(DATA.tech_name) !== -1
            );
            let styles = maskColor?.styles;
            if (boxWidth < 500) {
                styles = maskColor?.smallStyles || styles;
            } else if (boxWidth < 1000) {
                styles = maskColor?.middleStyles || styles;
            } else if (boxWidth < 2000) {
                styles = maskColor?.bigStyles || styles;
            }

            //Sum to calculate Hydration mask
            let intSum = 0;

            DATA.features.forEach(function (d) {
                //Group for svg objects
                // let group = '';
                if (!crop) {
                    // group = svg.querySelector('#subPolygons').appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"));
                    groupHolder.current = polygonsHolder.current.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "g"))
                }
                else {
                    groupHolder.current = polygonsHolder.current
                }

                //Base styles
                if (DATA.fill) {
                    groupHolder.current.style.fill = DATA.fill;
                }

                //Adding our custom styles
                if (styles) {
                    for (const [key, value] of Object.entries(styles)) {
                        groupHolder.current.style[key] = value;
                    }
                }

                //Intensity and custom intensity for 
                if (maskColor && maskColor.names.indexOf('dehydration') !== -1) {
                    intSum += d.properties.intensity * 100;
                    groupHolder.current.style['fill'] = maskColor.ranges.find(r => r.range[0] <= intSum && r.range[1] >= intSum)?.value || '';
                } else {
                    groupHolder.current.style['fill-opacity'] = d.properties.intensity;
                }

                //Generating objects
                d.geometry.coordinates.forEach(function (c) {
                    const object = objectGenerate(d.geometry.type, c, polygonsHolder.current);
                    // object.setAttribute('vector-effect', true);
                    // object.setAttribute('non-scaling-stroke', true);
                });
            });
        }

    }, [])



    return (
        <div>
            {/* <>{algo_tech_name}</> */}
            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" ref={svgHolder}>
                {/* <rect id="box" width="50%" height="50%" fill="#fff" /> */}
                <clipPath id="leftCheekMaskPolygons" ref={polygonsHolder} />
                {/* img to clip */}
                <image id="image" width="812" height="812" clipPath="url(#leftCheekMaskPolygons)" ref={imageHolder} />
                <g id="subPolygons" clipPath="url(#leftCheekMaskPolygons)" ref={groupHolder} />
            </svg>
        </div>
    );

}