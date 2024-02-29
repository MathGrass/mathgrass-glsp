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
import { AbstractModelValidator, GCompartment, GLabel, GModelElement, Marker, MarkerKind, ModelState } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { Node } from '../graph-extension';

@injectable()
export class WorkflowModelValidator extends AbstractModelValidator {
    @inject(ModelState)
    protected readonly modelState: ModelState;

    override doLiveValidation(element: GModelElement): Marker[] {
        const markers: Marker[] = [];
        if (element instanceof Node) {
            markers.push({
                kind: MarkerKind.ERROR,
                description: 'Task node names should start with upper case letters',
                elementId: element.id,
                label: 'Task node label in upper case'
            })
        }
        return markers;
    }

    override doBatchValidation(element: GModelElement): Marker[] {
        const markers: Marker[] = [];
        if (element instanceof Node) {
            markers.push({
                kind: MarkerKind.WARNING,
                description: 'Task node names should start with upper case letters',
                elementId: element.id,
                label: 'Task node label in upper case'
            })
        }
        return markers;
    }


}
