/********************************************************************************
 * Copyright (c) 2022-2023 STMicroelectronics and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import {
    ArgsUtil,
    GLabel,
    GLabelBuilder,
    GNode,
    GNodeBuilder
} from '@eclipse-glsp/server';
import { ModelTypes } from './util/model-types';

export class Node extends GNode {
    name: string;

    static override builder(): NodeBuilder {
        return new NodeBuilder(Node).layout('vbox').addArgs(ArgsUtil.cornerRadius(5)).addCssClass('node');
    }
}

export class NodeBuilder<T extends Node = Node> extends GNodeBuilder<T> {
    name(name: string): this {
        this.proxy.name = name;
        return this;
    }

    children(): this {
        return this;
    }

    override build(): T {
        this.layout('hbox').addLayoutOption('paddingRight', 10).add(this.createCompartmentHeader());
        return super.build();
    }

    protected createCompartmentHeader(): GLabel {
        return new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_HEADING)
            .id(this.proxy.id + '_classname')
            .text(this.proxy.name)
            .build();
    }
}