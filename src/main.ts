/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/webaudio.d.ts" />
module AngularSound {
	interface WebAudioEnabledWindow extends ng.IWindowService {
		AudioContext: { new (): AudioContext };
		webkitAudioContext: { new (): AudioContext };
	}

	interface SoundInformation {
		name: string;
		src: string;
	}

	class Sound {
		name: string;
		buffer: AudioBuffer;

		constructor(name: string, buffer: AudioBuffer) {
			this.name = name;
			this.buffer = buffer;
		}
	}

	export class SoundService {
		private $http: ng.IHttpService;
		private $q: ng.IQService;
		private sounds: Sound[];
		private context: AudioContext;

		// @ngInject
		constructor($window: WebAudioEnabledWindow, $http: ng.IHttpService, $q: ng.IQService) {
			this.$http = $http;
			this.$q = $q;
			this.sounds = [];

			if ($window.AudioContext)
				this.context = new $window.AudioContext();
			else if ($window.webkitAudioContext)
				this.context = new $window.webkitAudioContext();
			else throw 'browser does not support the web audio api';
		}

		loadSound(soundInfo: SoundInformation): ng.IPromise<Sound> {
			var deferred = this.$q.defer();

			this.$http.get(soundInfo.src, { responseType: 'arraybuffer' })
				.then((response: ng.IHttpPromiseCallbackArg<ArrayBuffer>) => {
					this.context.decodeAudioData(response.data, (audioBuffer: AudioBuffer) => {
						if (audioBuffer.duration > 50)
							throw soundInfo.name + ' is too long, this module is designed to handle sounds less than 50s long';

						var sound = new Sound(soundInfo.name, audioBuffer);
						this.sounds.push(sound);

						deferred.resolve(this.getBufferSource(sound));
					});
				}, (reason) => { throw reason });

			return deferred.promise;
		}

		getSound(name: string): AudioBufferSourceNode {
			for (var i in this.sounds) {
				if (this.sounds[i].name === name) {
					return this.getBufferSource(this.sounds[i]);
				}
			}

			throw 'no loaded sound called "' + name + '"';
		}

		private getBufferSource(sound: Sound): AudioBufferSourceNode {
			var bufferSource: AudioBufferSourceNode;
			bufferSource = this.context.createBufferSource();
			bufferSource.buffer = sound.buffer;
			bufferSource.connect(this.context.destination);

			return bufferSource;
		}
	}
}

angular
	.module('mcwebb.sound', [])
	.service('SoundService', AngularSound.SoundService);