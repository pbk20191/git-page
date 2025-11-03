export namespace XcodeAsset {
    export interface VerticalInset {
        top:number,
        bottom:number
    }
    export interface HorizontalInset {
        left:number,
        right:number
    }


    export namespace NinePatch {
         
        export type CenterMode = 'tile' | 'stretch'
        export type ResizingMode = '9-part' | '3-part-horizontal' | '3-part-vertical'

 
        export interface VerticalResizingInfo {
            mode:  '3-part-vertical'
            center: {
                mode:CenterMode,
                height:number
            }
            "cap-insets":VerticalInset
        }
        export interface HorizontalResizingInfo {
            mode: '3-part-horizontal'
            center: {
                mode:CenterMode,
                width:number
            },
            "cap-insets":HorizontalInset
        }
        export interface NineResizingInfo {
            mode:  '9-part'
            center: {
                mode: CenterMode,
                width: number,
                height: number
            },
            "cap-insets": HorizontalInset & VerticalInset
        }

        export type ResizingInfo = NineResizingInfo | VerticalResizingInfo | HorizontalResizingInfo
        

    }
   
}