export class Setting {

  constructor(
      public name: string,
      public type: 'string' | 'number' | 'boolean',
      public prettyName = '',
      private cb?: (v: any) => void
    ) { }

  public set(value: any) {
    localStorage.setItem(this.name, String(value));
    if (this.cb) {
        this.cb(value);
    }
  }

  public get() {

    const data = localStorage.getItem(this.name);

    if (this.type === 'boolean') {

      return data === 'true';

    } else if (this.type === 'number') {

      return Number(data);

    } else {

      return data ? String(data) : '';

    }

  }

}
