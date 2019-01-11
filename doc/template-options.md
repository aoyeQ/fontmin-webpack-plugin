# the template option
option:

1. **filepath**: 
   > `type`: [Path, String]
   
   > `default`: `path.resolve(__dirname, '../src')`

   > `desc`: split the required font according to the current file directory;
2. **fontpath**: 
   > `type`: [Path, String]
   
   > `desc`: font library source file path;
3. **targetpath**: 
   > `type`: [Path, String]

   > `desc`: The fontmin file that has been split generates the path;
4. **text**: 
   > `type`: [Path, String]
   
   > `default`: ''

   > `desc`: extra font;
5. **number**: 
   > `type`: [Boolean], 

   > `default`: `true`

   > `desc`: Whether to split the number of curresponding font;
6. **en**: 
    > `type`: [Boolean]

    > `default`: `true`

   > `desc`: Whether to cut the English letters of the corresponding font;
7. **regex**: 
    > `type`: [Regular],
    
    > `default`: `/[\u4e00-\u9fa5]/gm`
    
    > `desc`: Cut based on regular expressions;