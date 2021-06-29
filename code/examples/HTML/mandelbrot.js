<!doctype html>
<html>
  <label for="mandelbrot">Numbers for mandelbrot set!</label><br>
  <input type="text" value="800" id="screenX" name="screenX"><br>
  <input type="text" value="600" id="screenY" name="screenY"><br>
  <input type="text" value="255" id="depth" name="depth"><br>
  <input type="text" value="-2.23" id="xmin" name="xmin"><br>
  <input type="text" value="-1.15" id="ymin" name="ymin"><br>
  <input type="text" value=".83" id="xmax" name="xmax"><br>
  <input type="text" value="1.15" id="ymax" name="ymax"><br>
  <button id="action" onclick="myFunction()">Run Mandelbrot!</button>
  <p>
  <canvas id="canvas"></canvas>
  </p>
  <script src="mandelbrot.js"></script>
  <script>
    async function myFunction() {
      // Get variables from input fields
      var screenX = BigInt(parseInt(document.getElementById("screenX").value));
      var screenY = BigInt(parseInt(document.getElementById("screenY").value));
      var depth = parseInt(document.getElementById("depth").value);
      var xmin = parseFloat(document.getElementById("xmin").value);
      var ymin = parseFloat(document.getElementById("ymin").value);
      var xmax = parseFloat(document.getElementById("xmax").value);
      var ymax = parseFloat(document.getElementById("ymax").value);
      // Call Futhark
      var instance = await createFutharkModule();
      var fc = new instance.FutharkContext();
      var result = fc.main(screenX, screenY, depth, xmin, ymin, xmax, ymax);
      var vals = result.toTypedArray();
      // Set pixels for canvas
      var data = new Uint8ClampedArray(vals.length * 4);
      for (var i = 0; i < vals.length; i++) {
        data[4*i+0] = (vals[i] & 0xFF0000) >> 16;
        data[4*i+1] = (vals[i] & 0xFF00) >> 8
        data[4*i+2] = (vals[i] & 0xFF)
        data[4*i+3] = 255;
      }
      result.free();
      fc.free();
      // Make canvas and ctx
      var canvas = document.getElementById('canvas');
      canvas.width = Number(screenX);
      canvas.height = Number(screenY);
      var ctx = canvas.getContext('2d');
      var imgdata = new ImageData(data, Number(screenX), Number(screenY));
      ctx.putImageData(imgdata, 0, 0);
    }
  </script>
</html>