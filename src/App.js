import React, { useLayoutEffect } from 'react';
import utils from './Utils';
import {
  Ion,
  Viewer,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartographic,
  Math,
  Cartesian2,
  HorizontalOrigin,
  VerticalOrigin,
} from 'cesium';
//import { Cesium } from cesium-react;
import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css';

let cesiumViewer;

const App = ({ title }) => {
  useLayoutEffect(() => {
    Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMmZkNDMyOC0wOWM3LTQyOTQtYWU2ZS0yMjc2NGRjNGJlY2UiLCJpZCI6ODc5MjgsImlhdCI6MTY0OTAxNjU2NX0.abaJS2YS9TNnqSBxrUu8BEjtu_qq8eTagE-moYQrc4g';
    window.CESIUM_BASE_URL = './cesium';
    if (cesiumViewer) {
      return;
    }
    cesiumViewer = new Viewer('CesiumMap');

    const entity = cesiumViewer.entities.add({
      label: {
        show: false,
        showBackground: true,
        font: '14px monospace',
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.TOP,
        pixelOffset: new Cartesian2(15, 0),
      },
    });

    const scene = cesiumViewer.scene;

    console.log(`scene = ${scene}`);

    console.log(`canvas = ${scene.canvas}`);

    const handler = new ScreenSpaceEventHandler(scene.canvas);

    // handler.setInputAction((movement) => {
    //   console.log(`endPosition = ${movement.endPosition}`);

    //   console.log(`scene.globe.ellipsoid = ${scene.globe.ellipsoid}`);

    //   console.log(JSON.stringify(movement));

    //   const cartesian = cesiumViewer.camera.pickEllipsoid(
    //     movement.endPosition,
    //     scene.globe.ellipsoid
    //   );
    //   //alert(movement);
    // }, ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction((pickObject) => {
      //const cartesian = cesiumViewer.camera.pickEllipsoid(
      //  pickObject.position,
      //  scene.globe.ellipsoid
      //);
      const strs = utils.convertSceneCoordinatesToDegreesString(
        pickObject.position,
        cesiumViewer
      );
      alert(strs[0]);
    }, ScreenSpaceEventType.LEFT_DOWN);
  }, []);

  return (
    <div>
      {title}
      <div
        id="CesiumMap"
        style={{ width: '850px', height: '850px' }}
      ></div>
    </div>
  );
};

export const getCesiumViewer = () => cesiumViewer;

export default App;
