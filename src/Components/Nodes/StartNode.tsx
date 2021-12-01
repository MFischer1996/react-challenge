import React from "react";
import CustomNode, {CustomNodeChildProps} from "./CustomNode";

function StartNode(props: CustomNodeChildProps) {
    return (
        <CustomNode color="bg-green-500"
                    showTopHandle={false}
                    showBottomHandle={props.showHandles ?? true}
                    onDragStart={props.onDragStart}
                    draggable={props.showHandles === false}
                    selected={props.selected}
        >
            Start
        </CustomNode>
    );
}

export default StartNode;
