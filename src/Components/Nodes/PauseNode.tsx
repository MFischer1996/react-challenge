import React from "react";
import CustomNode, {CustomNodeChildProps} from "./CustomNode";

function PauseNode(props: CustomNodeChildProps) {
    return (
        <CustomNode color="bg-gray-500"
                    showTopHandle={props.showHandles ?? true}
                    showBottomHandle={props.showHandles ?? true}
                    onDragStart={props.onDragStart}
                    draggable={props.showHandles === false}
                    selected={props.selected}
        >
            Pause
        </CustomNode>
    );
}

export default PauseNode;
