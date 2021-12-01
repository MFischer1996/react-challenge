import React from "react";
import CustomNode, {CustomNodeChildProps} from "./CustomNode";

function QANode(props: CustomNodeChildProps) {
    return (
        <CustomNode color="bg-yellow-500"
                    showTopHandle={props.showHandles ?? true}
                    showBottomHandle={props.showHandles ?? true}
                    onDragStart={props.onDragStart}
                    draggable={props.showHandles === false}
                    selected={props.selected}
        >
            Q&A with
            <input type="text" className="text-black w-4/5 rounded p-1" placeholder="Name" id={props.id} defaultValue={props.data?.value} onChange={props.data?.onChange}/>
        </CustomNode>
    );
}

export default QANode;
