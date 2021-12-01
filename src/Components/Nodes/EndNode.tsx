import React from "react";
import CustomNode, {CustomNodeChildProps} from "./CustomNode";

function EndNode(props: CustomNodeChildProps) {
    return (
        <CustomNode color="bg-red-500"
                    showTopHandle={props.showHandles ?? true}
                    showBottomHandle={false}
                    onDragStart={props.onDragStart}
                    draggable={props.showHandles === false}
                    selected={props.selected}
        >
            End
        </CustomNode>
    );
}

export default EndNode;
