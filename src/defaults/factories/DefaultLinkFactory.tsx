import * as React from "react";
import { DefaultLinkWidget } from "../widgets/DefaultLinkWidget";
import { DiagramEngine } from "../../DiagramEngine";
import { AbstractLinkFactory } from "../../factories/AbstractLinkFactory";
import { DefaultLinkModel } from "../models/DefaultLinkModel";

/**
 * @author Dylan Vorster
 */
export class DefaultLinkFactory extends AbstractLinkFactory<DefaultLinkModel> {
	constructor() {
		super("default");
	}

	generateReactWidget(
		diagramEngine: DiagramEngine,
		link: DefaultLinkModel
	): JSX.Element {
		return React.createElement(DefaultLinkWidget, {
			link: link,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): DefaultLinkModel {
		return new DefaultLinkModel();
	}

	generateLinkSegment(
		model: DefaultLinkModel,
		widget: DefaultLinkWidget,
		selected: boolean,
		path: string
	) {
		return (
			<g>
				<defs>
					<marker
						id="arrow"
						markerWidth="100"
						markerHeight="100"
						refX="6"
						refY="2"
						orient="auto"
						markerUnits="stroke-width"
					>
						<path className="arrow" d="M0,0 V4 L2,2 Z" fill="red" />
					</marker>
				</defs>
				<path
					markerEnd="url(#arrow)"
					className={selected ? widget.bem("--path-selected") : ""}
					strokeWidth={model.width}
					stroke={model.color}
					d={path}
				/>
			</g>
		);
	}
}
