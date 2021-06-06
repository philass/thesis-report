compileMulticoreToWASMAction :: FutharkConfig -> CompilerMode -> FilePath -> Action MCMem
compileMulticoreToWASMAction fcfg mode outpath =
  Action
    { actionName = "Compile to sequential C",
      actionDescription = "Compile to sequential C",
      actionProcedure = helper
    }
  where
    helper prog = do
      (cprog, jsprog, exps) <- handleWarnings fcfg $ MulticoreWASM.compileProg prog
      let cpath = outpath `addExtension` "c"
          hpath = outpath `addExtension` "h"
          jpath = outpath `addExtension` "js"

      case mode of
        ToExecutable -> do
          liftIO $ writeFile cpath $ MulticoreC.asExecutable cprog
          -- Can't actually run multicore-wasm in node
          runEMCC cpath outpath ["-O3"] ["-lm", "-pthread"] exps True
        ToLibrary -> do
          writeLibs cprog jsprog hpath cpath
          runEMCC cpath jpath ["-O3"] ["-lm", "-pthread"] exps False
        ToServer -> do
          writeLibs cprog jsprog hpath cpath
          liftIO $ appendFile "futharkClass.js" MulticoreWASM.runServer
          runEMCC cpath outpath ["-O3"] ["-lm", "-pthread"] exps False
    writeLibs cprog jsprog hpath cpath = do
      let (h, imp) = MulticoreC.asLibrary cprog
      liftIO $ writeFile hpath h
      liftIO $ writeFile cpath imp
      liftIO $ writeFile "futharkClass.js" jsprog