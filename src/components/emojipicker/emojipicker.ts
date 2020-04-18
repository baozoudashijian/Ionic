import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';
/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export const  EMOJI_ACCESSOR: any ={
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojipickerComponent),
  multi: true
}

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [EMOJI_ACCESSOR]
})
// 实现接口implements，这个是TypeScript的东西，实现接口你就必须要实现这个接口的所有方法；
export class EmojipickerComponent implements ControlValueAccessor {

  emojiArray = [];
  content : string;
  onChanged: Function;
  onTouched: Function;

  constructor(emojiProvider: EmojiProvider) {
    // emoji这个provider返回的就是一个数组，让这个组件定义的数组等于于这个返回的数组，兄弟没毛病
    this.emojiArray = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }

  setValue(val: any) {
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }

}
