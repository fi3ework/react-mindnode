import genUID from 'uuid/v4'
import { observable, computed, action } from 'mobx'

interface IOpt{
  isRoot: boolean;
}

class NodeModel {
  @observable public text: string = 'example'
  @observable public parentID: string
  @observable public childs: NodeModel[] = []
  @observable public isRoot: boolean = false
  private ID: string

  public constructor(opt: IOpt = { isRoot: false }) {
    this.isRoot = opt.isRoot
  }

  @action
  public addChild = (): void => {
    this.childs.push(new NodeModel())
  }

  @action
  public editText(newText: string): void {
    this.text = newText
  }
}

export default NodeModel