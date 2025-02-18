import { DefaultPortModel } from "./DefaultPortModel";
import * as _ from "lodash";

import { NodeModel, NodeModelListener } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";

/**
 * @author Dylan Vorster
 */
export class DefaultNodeModel extends NodeModel<NodeModelListener> {
	name: string;
	subtitle?: string;
	data?: string;
	color: string;
	ports: { [s: string]: DefaultPortModel };

	constructor(
		name: string = "Untitled",
		color: string = "rgb(0,192,255)",
		subtitle = "",
		data = ""
	) {
		super("default");
		this.name = name;
		this.color = color;
		this.subtitle = subtitle;
		this.data = data;
	}

	addInPort(label: string): DefaultPortModel {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label: string): DefaultPortModel {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.subtitle = object.subtitle;
		this.data = object.data;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			subtitle: this.subtitle,
			color: this.color,
			data: this.data
		});
	}

	getInPorts(): DefaultPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.in;
		});
	}

	getOutPorts(): DefaultPortModel[] {
		return _.filter(this.ports, portModel => {
			return !portModel.in;
		});
	}
}
