import genUID from 'uuid/v4'
import { observable, computed, action } from 'mobx'

interface IOpt{
  isRoot: boolean;
}

interface IPoint{
  x: number;
  y: number;
}

class NodeModel {
  @observable public text: string = 'example'
  @observable public parent: NodeModel
  @observable public childs: NodeModel[] = []
  @observable public isRoot: boolean = false
  public centerPos: { x: number; y: number }
  private ID: string = genUID()

  public constructor(opt: IOpt = { isRoot: false }) {
    this.isRoot = opt.isRoot
  }

  public setCenter = (pos: IPoint): void => {
    this.centerPos = pos
  }

  public getParenetCenter = (): IPoint => {
    return this.parent.centerPos
  }

  @action
  public addChild = (): void => {
    const childNode = new NodeModel()
    childNode.parent = this
    this.childs.push(childNode)
  }

  @action
  public editText(newText: string): void {
    this.text = newText
  }
}

export default NodeModel