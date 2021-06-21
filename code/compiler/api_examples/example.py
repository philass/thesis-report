import numpy as np
import scale

scalar = 0.5
matrix = [[0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11]]

np_matrix = np.array(matrix).astype("float32")

scale_class = scale.scale()
result = scale_class.scale(scalar, np_matrix)
print(result)
