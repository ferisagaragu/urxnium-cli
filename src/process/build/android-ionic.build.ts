import { Command } from '../../core/interface/command';

export class AndroidIonicBuild extends Command {



  buildAndroidApk() {
    let out = '';
    const namePath = './android/app/src/main/res/values/';
    const manifest = this.file.readFile(`${namePath}strings.xml`);
    const packageJson = JSON.parse(this.file.readFile('package.json'));
    const appName = `${packageJson.name}_${packageJson.version}`;

    manifest.split('\n').forEach((data, index) => {
      if (index === 2) {
        out += `<string name="app_name">${appName}</string>\n`;
      } else {
        out += data + '\n';
      }
    });

    this.file.writeFile(`${namePath}strings.xml`, out.substring(0, out.length - 1));

    let result = '';

    this.print.information('start to sync capacitor plugins');
    result = this.console.exe('ionic capacitor copy android').toString();
    this.print.success('sync capacitor plugins success');

    this.print.information('generate apk');
    result += this.console.exe('cd android && gradlew assembleDebug && cd ..').toString();
    this.print.success('apk was generated success');

    this.file.writeFile('./dist/apk/logs.txt', result);
    this.file.copyFile(
      './android/app/build/outputs/apk/debug/app-debug.apk',
      `./dist/apk/${appName}.apk`
    );
  }

}