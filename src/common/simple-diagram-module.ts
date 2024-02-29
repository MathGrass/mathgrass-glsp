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
    BindingTarget,
    CommandPaletteActionProvider,
    ContextActionsProvider,
    ContextEditValidator,
    ContextMenuItemProvider,
    DiagramConfiguration,
    EdgeCreationChecker,
    GLSPServer,
    GModelDiagramModule,
    InstanceMultiBinding,
    LabelEditValidator,
    ModelValidator,
    MultiBinding,
    NavigationTargetProvider,
    NavigationTargetResolver,
    OperationHandlerConstructor,
    PopupModelFactory,
    ServerModule,
    SourceModelStorage
} from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { CreateEdgeHandler } from './handler/create-edge-handler';
import { WorkflowLabelEditValidator } from './labeledit/workflow-label-edit-validator';
import { WorkflowModelValidator } from './marker/workflow-model-validator';
import { WorkflowNavigationTargetResolver } from './model/workflow-navigation-target-resolver';
import { SimpleDiagramConfiguration } from './simple-diagram-configuration';
import { SimpleGLSPServer } from './workflow-glsp-server';
import { CreateNodeHandler } from './handler/create-node-handler';

@injectable()
export class WorkflowServerModule extends ServerModule {
    protected override bindGLSPServer(): BindingTarget<GLSPServer> {
        return SimpleGLSPServer;
    }
}

@injectable()
export class WorkflowDiagramModule extends GModelDiagramModule {
    constructor(public bindSourceModelStorage: () => BindingTarget<SourceModelStorage>) {
        super();
    }

    get diagramType(): string {
        return 'simple-diagram';
    }

    protected override configureOperationHandlers(binding: InstanceMultiBinding<OperationHandlerConstructor>): void {
        super.configureOperationHandlers(binding);
        binding.add(CreateEdgeHandler);
        binding.add(CreateNodeHandler);
    }

    protected bindDiagramConfiguration(): BindingTarget<DiagramConfiguration> {
        return SimpleDiagramConfiguration;
    }

    protected override bindNavigationTargetResolver(): BindingTarget<NavigationTargetResolver> | undefined {
        return WorkflowNavigationTargetResolver;
    }

    protected override bindLabelEditValidator(): BindingTarget<LabelEditValidator> | undefined {
        return WorkflowLabelEditValidator;
    }

    protected override bindModelValidator(): BindingTarget<ModelValidator> | undefined {
        return WorkflowModelValidator;
    }
}
