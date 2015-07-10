/// <reference path="../typings/tsd.d.ts" />
module AngularSound {
	interface ISound {
		name: string;
		src: string;
	}

	class Sound implements ISound {
		name: string;
		src: string;

		constructor(name, src) {
			this.name = name;
			this.src = src;
		}
	}

	export class Service {
		private sounds: ISound[];

		// @ngInject
		constructor($q: ng.IQService, $timeout: ng.ITimeoutService) {
			this.sounds = [];
		}

		loadSound(sound: ISound): Service {
			this.sounds.push(
				new Sound(sound.name, sound.src)
			);

			return this;
		}

		getSound(name: string) {
			this.sounds.forEach(sound => {
				if (sound.name === name) {
					return sound;
				}
			});

			throw 'no loaded sound called "' + name + '"';
		}
	}
}

angular
	.module('mcwebb.angular-sound', [])
	.service('SoundService', AngularSound.Service);