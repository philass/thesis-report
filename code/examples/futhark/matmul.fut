let matmul [n][p][m] (xss: [n][p]t) (yss: [p][m]t): [n][m]t =
    let dotprod v1 v2 = reduce (+) 0 (map2 (*) v1 v2)
    in map (\xs -> map (dotprod xs) (transpose yss)) xss