# angular-sound
An AngularJS service to play audio via the Web Audio API.

## Installation
### Install through bower:
```bash
# from the terminal at the root of your project
bower install angular-sound
```
### Add to your module deps
```js
angular.module('xxxx', ['mcwebb.sound']);
```

## Use
### Methods
`SoundService.loadSound()` returns a `$q` promise which resolves to an instance of [`AudioBufferSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode). However usually you would load the sound prior to point where you actually want to use it.

`SoundService.getSound()` returns an instance of [`AudioBufferSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode). These instances are cheap and can only be played once. Thus everytime you want to play a sound you should call `getSound()` to get a new instance.


### Example
```javascript
angular.module('xxxx')
  .run(function (SoundService) {
    SoundService.loadSound({
      name: 'sound2',
      src: './sounds/sound2.ogg'
    });
  })
  .controller('MyController', function (SoundService) {
    var vm = this;

    SoundService.loadSound({
        name: 'sound1',
        src: './sounds/sound1.ogg'
    }).then(function (sound) {
      vm.sound1 = sound;
    });

    vm.playSound = function (name) {
      SoundService.getSound(name).start();
    }
  });
```
```html
<div ng-app="xxxx" ng-controller="MyController as MyController">
  <button ng-click="MyController.sound1.start()">Play Sound 1</button>
  <button ng-click="MyController.sound1.stop()">Stop Sound 1</button>
  <label for="loop-sound1">
    Loop
    <input type="checkbox" ng-model="MyController.sound1.loop" />
  </label>
  <br />
  <button ng-click="MyController.playSound('sound2')">Play Sound 2</button>
</div>
```