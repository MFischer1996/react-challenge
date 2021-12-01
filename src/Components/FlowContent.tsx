import React, {Ref, useCallback, useRef, useState} from "react";
import ReactFlow, {
    addEdge,
    ConnectionLineType, Controls,
    Elements,
    FlowElement,
    getIncomers,
    getOutgoers, isEdge,
    Node,
    ReactFlowProvider,
    removeElements,
    updateEdge
} from "react-flow-renderer";
import {Connection, Edge, OnLoadParams} from "react-flow-renderer/dist/types";
import AuthorNode from "./Nodes/AuthorNode";
import StartNode from "./Nodes/StartNode";
import QANode from "./Nodes/QANode";
import PauseNode from "./Nodes/PauseNode";
import EndNode from "./Nodes/EndNode";
import axios from "axios";

const initialElements = [
    {
        id: '1',
        type: 'startNode',
        data: { label: 'input node' },
        position: { x: 100, y: 10 },
    },
];

const nodeTypes = {
    authorNode: AuthorNode,
    startNode: StartNode,
    qaNode: QANode,
    pauseNode: PauseNode,
    endNode: EndNode,
};

let id = 0;
const getId = () => `flow_node_${id++}_${Date.now()}`;

function FlowContent() {
    const reactFlowWrapper: Ref<HTMLDivElement> = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null as any as OnLoadParams);
    const [loading, setLoading] = useState(true);
    const [elements, setElements] = useState(initialElements as Elements);

    const checkDuplicates = (els: FlowElement[], source: string, target: string, limit: number = 0): boolean => {
        // No more than one outgoing edge
        const outgoingElement = els.find(e => e.id === source);
        if (!outgoingElement) return false;
        const outgoingEdges = getOutgoers(outgoingElement as Node, els);
        if (outgoingEdges.length > limit) return false;

        // No more than one incoming edge
        const incomingElement = els.find(e => e.id === target);
        if (!incomingElement) return false;
        let incomingEdges = getIncomers(incomingElement as Node, els);
        return incomingEdges.length <= limit;


    }

    const onConnect = (params: Edge | Connection) => setElements((els) => {
        if (!params.source || !params.target) {
            return els;
        }
        if (!checkDuplicates(els, params.source, params.target)) return els;

        return addEdge(params, els);
    });

    const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) =>
        setElements((els) => {
            if (!newConnection.source || !newConnection.target) {
                return els;
            }
            if (!checkDuplicates(updateEdge(oldEdge, newConnection, els), newConnection.source, newConnection.target, 1)) return els;

            return updateEdge(oldEdge, newConnection, els);
        }
    );

    const onElementsRemove = (elementsToRemove: Elements) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
        axios.get("http://localhost:3333").then(res => {
            setLoading(false);
            if (res.data.hasOwnProperty('elements'))
            {
                const elements = res.data.elements.map((e: unknown) => {
                    if (isEdge(e as any)) return e;
                    (e as any).data.onChange = onChange;
                    return e;
                })
                setElements(elements);
            }

        })
    };

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onChange = (event: any) => {
        setElements((els) =>
            els.map((e) => {
                if (e.id !== event.target.id) return e;
                const value = event.target.value;

                return {
                    ...e,
                    data: {
                        ...e.data,
                        value,
                    },
                };
            })
        );
    };

    const onDrop = (event: any) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        if (!reactFlowBounds) return;
        const type = event.dataTransfer.getData('application/reactflow');
        const x = event.dataTransfer.getData('application/x');
        const y = event.dataTransfer.getData('application/y');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left - x,
            y: event.clientY - reactFlowBounds.top - y,
        });

        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node`, onChange: onChange, value: ""},
        };

        setElements((es) => es.concat(newNode));
    };

    const onSave = useCallback(async () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            await axios.post('http://127.0.0.1:3333/save', flow);
        }
    }, [reactFlowInstance]);

    return (
        <div className="flow flex-grow h-full bg-white">
            <ReactFlowProvider>
                <div className="h-full w-full" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onEdgeUpdate={onEdgeUpdate}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        deleteKeyCode={46}
                        nodeTypes={nodeTypes}
                        connectionLineType={ConnectionLineType.Straight}
                    >
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
            {loading && <div className="absolute w-screen h-screen bg-white top-0 left-0 z-50 font-bold text-6xl text-green-500 text-center flex justify-center align-middle">
                <div className="self-center">Loading...</div>
            </div>}
            <input type="button" className="absolute top-2 right-2 h-8 w-24 bg-green-500 rounded z-10 text-white cursor-pointer" onClick={onSave} value="Save"/>
        </div>
    );
}

export default FlowContent;
