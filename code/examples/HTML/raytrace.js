<!doctype html>
<html>
  <button id="action" onclick="myFunction()">Run RayTracer!</button>
  <p>
  <canvas id="canvas"></canvas>
  </p>
  <script src="raytracer.js"></script>
  <script>
    async function myFunction() {
      var screenX = 400n
      var screenY = 400n
      var ns = 50;
      var nobj = 5;
      var instance = await createFutharkModule();
      var fc = new instance.FutharkContext();
      // Call Futhark
      var result = fc.main(screenX, screenY, ns, nobj);
      // Get javascript values from futhark
      var vals = result.toTypedArray();
      // Set pixels for canvas
      var data = new Uint8ClampedArray(vals.length * 4);
      for (var i = 0; i < vals.length; i++) {
        data[4*i+0] = (vals[i] & 0xFF0000) >> 16;
        data[4*i+1] = (vals[i] & 0xFF00) >> 8
        data[4*i+2] = (vals[i] & 0xFF)
        data[4*i+3] = 255;
      }
      // Make canvas and ctx
      var canvas = document.getElementById('canvas');
      canvas.width = Number(screenX);
      canvas.height = Number(screenY);
      var ctx = canvas.getContext('2d');
      var imgdata = new ImageData(data, Number(screenX), Number(screenY));
      ctx.putImageData(imgdata, 0, 0);
      result.free();
      fc.free();
      
    }
  </script>
</html>