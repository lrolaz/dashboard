// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {HttpParams} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {Node, NodeList} from '@api/backendapi';
import {StateService} from '@uirouter/core';
import {Observable} from 'rxjs/Observable';

import {ResourceListWithStatuses} from '../../../../common/resources/list';
import {ResourceListService} from '../../../../common/services/resource/resourcelist';
import {nodeDetailState} from '../detail/state';

@Component({
  selector: 'kd-node-list',
  templateUrl: './template.html',
})
export class NodeListComponent extends ResourceListWithStatuses<NodeList, Node> {
  @Input() endpoint: string;

  constructor(
      state: StateService, private readonly nodeListService_: ResourceListService<NodeList>) {
    super(nodeDetailState.name, state);

    // Override default warning icon.
    this.setWarningIcon('help');
  }

  getResourceObservable(params?: HttpParams): Observable<NodeList> {
    return this.nodeListService_.get(this.endpoint, params);
  }

  map(nodeList: NodeList): Node[] {
    return nodeList.nodes;
  }

  isInErrorState(resource: Node): boolean {
    return resource.ready === 'False';
  }

  isInWarningState(resource: Node): boolean {
    return resource.ready === 'Unknown';
  }

  isInSuccessState(resource: Node): boolean {
    return resource.ready === 'True';
  }

  getDisplayColumns(): string[] {
    return ['statusicon', 'name', 'labels', 'ready', 'cpureq', 'cpulim', 'memreq', 'memlim', 'age'];
  }
}
