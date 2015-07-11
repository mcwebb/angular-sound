/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/webaudio.d.ts" />
var AngularSound;
(function (AngularSound) {
    var Sound = (function () {
        function Sound(name, buffer) {
            this.name = name;
            this.buffer = buffer;
        }
        return Sound;
    })();
    var SoundService = (function () {
        // @ngInject
        function SoundService($window, $http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.sounds = [];
            if ($window.AudioContext)
                this.context = new $window.AudioContext();
            else if ($window.webkitAudioContext)
                this.context = new $window.webkitAudioContext();
            else
                throw 'browser does not support the web audio api';
        }
        SoundService.$inject = ["$window", "$http", "$q"];
        SoundService.prototype.loadSound = function (soundInfo) {
            var _this = this;
            var deferred = this.$q.defer();
            this.$http.get(soundInfo.src, { responseType: 'arraybuffer' }).then(function (response) {
                _this.context.decodeAudioData(response.data, function (audioBuffer) {
                    if (audioBuffer.duration > 50)
                        throw soundInfo.name + ' is too long, this module is designed to handle sounds less than 50s long';
                    var sound = new Sound(soundInfo.name, audioBuffer);
                    _this.sounds.push(sound);
                    deferred.resolve(_this.getBufferSource(sound));
                });
            }, function (reason) {
                throw reason;
            });
            return deferred.promise;
        };
        SoundService.prototype.getSound = function (name) {
            for (var i in this.sounds) {
                if (this.sounds[i].name === name) {
                    return this.getBufferSource(this.sounds[i]);
                }
            }
            throw 'no loaded sound called "' + name + '"';
        };
        SoundService.prototype.getBufferSource = function (sound) {
            var bufferSource;
            bufferSource = this.context.createBufferSource();
            bufferSource.buffer = sound.buffer;
            bufferSource.connect(this.context.destination);
            return bufferSource;
        };
        return SoundService;
    })();
    AngularSound.SoundService = SoundService;
})(AngularSound || (AngularSound = {}));
angular.module('mcwebb.angular-sound', []).service('SoundService', AngularSound.SoundService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiLCJtYWluLmpzIl0sIm5hbWVzIjpbIkFuZ3VsYXJTb3VuZCIsIkFuZ3VsYXJTb3VuZC5Tb3VuZCIsIkFuZ3VsYXJTb3VuZC5Tb3VuZC5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJTb3VuZC5Tb3VuZFNlcnZpY2UiLCJBbmd1bGFyU291bmQuU291bmRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiQW5ndWxhclNvdW5kLlNvdW5kU2VydmljZS5sb2FkU291bmQiLCJBbmd1bGFyU291bmQuU291bmRTZXJ2aWNlLmdldFNvdW5kIiwiQW5ndWxhclNvdW5kLlNvdW5kU2VydmljZS5nZXRCdWZmZXJTb3VyY2UiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQU87QUFBUCxDQUFBLFVBQU8sY0FBYTtJQVduQkEsSUFBTUEsUUFBS0EsQ0FBQUEsWUFBQUE7UUFJVkMsU0FKS0EsTUFJT0EsTUFBY0EsUUFBbUJBO1lBQzVDQyxLQUFLQSxPQUFPQTtZQUNaQSxLQUFLQSxTQUFTQTs7UUFFaEJELE9BQUFBOztJQUVBRCxJQUFhQSxlQUFZQSxDQUFBQSxZQUFBQTs7UUFPeEJHLFNBUFlBLGFBT0FBLFNBQWdDQSxPQUF3QkEsSUFBZ0JBO1lBQ25GQyxLQUFLQSxRQUFRQTtZQUNiQSxLQUFLQSxLQUFLQTtZQUNWQSxLQUFLQSxTQUFTQTtZQUVkQSxJQUFJQSxRQUFRQTtnQkFDWEEsS0FBS0EsVUFBVUEsSUFBSUEsUUFBUUE7aUJBQ3ZCQSxJQUFJQSxRQUFRQTtnQkFDaEJBLEtBQUtBLFVBQVVBLElBQUlBLFFBQVFBOztnQkFDdkJBLE1BQU1BOzs7UUFHWkQsYUFBQUEsVUFBQUEsWUFBQUEsVUFBVUEsV0FBMkJBO1lBQXJDRSxJQUFBQSxRQUFBQTtZQUNDQSxJQUFJQSxXQUFXQSxLQUFLQSxHQUFHQTtZQUV2QkEsS0FBS0EsTUFBTUEsSUFBSUEsVUFBVUEsS0FBS0EsRUFBRUEsY0FBY0EsaUJBQzVDQSxLQUFLQSxVQUFDQSxVQUFpREE7Z0JBQ3ZEQSxNQUFLQSxRQUFRQSxnQkFBZ0JBLFNBQVNBLE1BQU1BLFVBQUNBLGFBQXdCQTtvQkFDcEVBLElBQUlBLFlBQVlBLFdBQVdBO3dCQUMxQkEsTUFBTUEsVUFBVUEsT0FBT0E7b0JBRXhCQSxJQUFJQSxRQUFRQSxJQUFJQSxNQUFNQSxVQUFVQSxNQUFNQTtvQkFDdENBLE1BQUtBLE9BQU9BLEtBQUtBO29CQUVqQkEsU0FBU0EsUUFBUUEsTUFBS0EsZ0JBQWdCQTs7ZUFFckNBLFVBQUNBLFFBQU1BO2dCQUFPQSxNQUFNQTs7WUFFeEJBLE9BQU9BLFNBQVNBOztRQUdqQkYsYUFBQUEsVUFBQUEsV0FBQUEsVUFBU0EsTUFBWUE7WUFDcEJHLEtBQUtBLElBQUlBLEtBQUtBLEtBQUtBLFFBQVFBO2dCQUMxQkEsSUFBSUEsS0FBS0EsT0FBT0EsR0FBR0EsU0FBU0EsTUFBTUE7b0JBQ2pDQSxPQUFPQSxLQUFLQSxnQkFBZ0JBLEtBQUtBLE9BQU9BOzs7WUFJMUNBLE1BQU1BLDZCQUE2QkEsT0FBT0E7O1FBR25DSCxhQUFBQSxVQUFBQSxrQkFBUkEsVUFBd0JBLE9BQVlBO1lBQ25DSSxJQUFJQTtZQUNKQSxlQUFlQSxLQUFLQSxRQUFRQTtZQUM1QkEsYUFBYUEsU0FBU0EsTUFBTUE7WUFDNUJBLGFBQWFBLFFBQVFBLEtBQUtBLFFBQVFBO1lBRWxDQSxPQUFPQTs7UUFFVEosT0FBQUE7O0lBeERhSCxhQUFBQSxlQUFBQTtHQXJCUCxpQkFBQSxlQUFZO0FBZ0ZuQixRQUNFLE9BQU8sd0JBQXdCLElBQy9CLFFBQVEsZ0JBQWdCLGFBQWE7QUN4QnZDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy93ZWJhdWRpby5kLnRzXCIgLz5cbm1vZHVsZSBBbmd1bGFyU291bmQge1xuXHRpbnRlcmZhY2UgV2ViQXVkaW9FbmFibGVkV2luZG93IGV4dGVuZHMgbmcuSVdpbmRvd1NlcnZpY2Uge1xuXHRcdEF1ZGlvQ29udGV4dDogeyBuZXcgKCk6IEF1ZGlvQ29udGV4dCB9O1xuXHRcdHdlYmtpdEF1ZGlvQ29udGV4dDogeyBuZXcgKCk6IEF1ZGlvQ29udGV4dCB9O1xuXHR9XG5cblx0aW50ZXJmYWNlIFNvdW5kSW5mb3JtYXRpb24ge1xuXHRcdG5hbWU6IHN0cmluZztcblx0XHRzcmM6IHN0cmluZztcblx0fVxuXG5cdGNsYXNzIFNvdW5kIHtcblx0XHRuYW1lOiBzdHJpbmc7XG5cdFx0YnVmZmVyOiBBdWRpb0J1ZmZlcjtcblxuXHRcdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgYnVmZmVyOiBBdWRpb0J1ZmZlcikge1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHRcdHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBTb3VuZFNlcnZpY2Uge1xuXHRcdHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZTtcblx0XHRwcml2YXRlICRxOiBuZy5JUVNlcnZpY2U7XG5cdFx0cHJpdmF0ZSBzb3VuZHM6IFNvdW5kW107XG5cdFx0cHJpdmF0ZSBjb250ZXh0OiBBdWRpb0NvbnRleHQ7XG5cblx0XHQvLyBAbmdJbmplY3Rcblx0XHRjb25zdHJ1Y3Rvcigkd2luZG93OiBXZWJBdWRpb0VuYWJsZWRXaW5kb3csICRodHRwOiBuZy5JSHR0cFNlcnZpY2UsICRxOiBuZy5JUVNlcnZpY2UpIHtcblx0XHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcblx0XHRcdHRoaXMuJHEgPSAkcTtcblx0XHRcdHRoaXMuc291bmRzID0gW107XG5cblx0XHRcdGlmICgkd2luZG93LkF1ZGlvQ29udGV4dClcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0gbmV3ICR3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG5cdFx0XHRlbHNlIGlmICgkd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dClcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0gbmV3ICR3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KCk7XG5cdFx0XHRlbHNlIHRocm93ICdicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHdlYiBhdWRpbyBhcGknO1xuXHRcdH1cblxuXHRcdGxvYWRTb3VuZChzb3VuZEluZm86IFNvdW5kSW5mb3JtYXRpb24pOiBuZy5JUHJvbWlzZTxTb3VuZD4ge1xuXHRcdFx0dmFyIGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpO1xuXG5cdFx0XHR0aGlzLiRodHRwLmdldChzb3VuZEluZm8uc3JjLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KVxuXHRcdFx0XHQudGhlbigocmVzcG9uc2U6IG5nLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPEFycmF5QnVmZmVyPikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVzcG9uc2UuZGF0YSwgKGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGF1ZGlvQnVmZmVyLmR1cmF0aW9uID4gNTApXG5cdFx0XHRcdFx0XHRcdHRocm93IHNvdW5kSW5mby5uYW1lICsgJyBpcyB0b28gbG9uZywgdGhpcyBtb2R1bGUgaXMgZGVzaWduZWQgdG8gaGFuZGxlIHNvdW5kcyBsZXNzIHRoYW4gNTBzIGxvbmcnO1xuXG5cdFx0XHRcdFx0XHR2YXIgc291bmQgPSBuZXcgU291bmQoc291bmRJbmZvLm5hbWUsIGF1ZGlvQnVmZmVyKTtcblx0XHRcdFx0XHRcdHRoaXMuc291bmRzLnB1c2goc291bmQpO1xuXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHRoaXMuZ2V0QnVmZmVyU291cmNlKHNvdW5kKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sIChyZWFzb24pID0+IHsgdGhyb3cgcmVhc29uIH0pO1xuXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0XHR9XG5cblx0XHRnZXRTb3VuZChuYW1lOiBzdHJpbmcpOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGUge1xuXHRcdFx0Zm9yICh2YXIgaSBpbiB0aGlzLnNvdW5kcykge1xuXHRcdFx0XHRpZiAodGhpcy5zb3VuZHNbaV0ubmFtZSA9PT0gbmFtZSkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEJ1ZmZlclNvdXJjZSh0aGlzLnNvdW5kc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhyb3cgJ25vIGxvYWRlZCBzb3VuZCBjYWxsZWQgXCInICsgbmFtZSArICdcIic7XG5cdFx0fVxuXG5cdFx0cHJpdmF0ZSBnZXRCdWZmZXJTb3VyY2Uoc291bmQ6IFNvdW5kKTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlIHtcblx0XHRcdHZhciBidWZmZXJTb3VyY2U6IEF1ZGlvQnVmZmVyU291cmNlTm9kZTtcblx0XHRcdGJ1ZmZlclNvdXJjZSA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcblx0XHRcdGJ1ZmZlclNvdXJjZS5idWZmZXIgPSBzb3VuZC5idWZmZXI7XG5cdFx0XHRidWZmZXJTb3VyY2UuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xuXG5cdFx0XHRyZXR1cm4gYnVmZmVyU291cmNlO1xuXHRcdH1cblx0fVxufVxuXG5hbmd1bGFyXG5cdC5tb2R1bGUoJ21jd2ViYi5hbmd1bGFyLXNvdW5kJywgW10pXG5cdC5zZXJ2aWNlKCdTb3VuZFNlcnZpY2UnLCBBbmd1bGFyU291bmQuU291bmRTZXJ2aWNlKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy93ZWJhdWRpby5kLnRzXCIgLz5cbnZhciBBbmd1bGFyU291bmQ7XG4oZnVuY3Rpb24gKEFuZ3VsYXJTb3VuZCkge1xuICAgIHZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFNvdW5kKG5hbWUsIGJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTb3VuZDtcbiAgICB9KSgpO1xuICAgIHZhciBTb3VuZFNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBAbmdJbmplY3RcbiAgICAgICAgZnVuY3Rpb24gU291bmRTZXJ2aWNlKCR3aW5kb3csICRodHRwLCAkcSkge1xuICAgICAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgICAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMgPSBbXTtcbiAgICAgICAgICAgIGlmICgkd2luZG93LkF1ZGlvQ29udGV4dClcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgJHdpbmRvdy5BdWRpb0NvbnRleHQoKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCR3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyAkd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93ICdicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHdlYiBhdWRpbyBhcGknO1xuICAgICAgICB9XG4gICAgICAgIFNvdW5kU2VydmljZS5wcm90b3R5cGUubG9hZFNvdW5kID0gZnVuY3Rpb24gKHNvdW5kSW5mbykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHNvdW5kSW5mby5zcmMsIHsgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVzcG9uc2UuZGF0YSwgZnVuY3Rpb24gKGF1ZGlvQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdWRpb0J1ZmZlci5kdXJhdGlvbiA+IDUwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgc291bmRJbmZvLm5hbWUgKyAnIGlzIHRvbyBsb25nLCB0aGlzIG1vZHVsZSBpcyBkZXNpZ25lZCB0byBoYW5kbGUgc291bmRzIGxlc3MgdGhhbiA1MHMgbG9uZyc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VuZCA9IG5ldyBTb3VuZChzb3VuZEluZm8ubmFtZSwgYXVkaW9CdWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb3VuZHMucHVzaChzb3VuZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMuZ2V0QnVmZmVyU291cmNlKHNvdW5kKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgU291bmRTZXJ2aWNlLnByb3RvdHlwZS5nZXRTb3VuZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuc291bmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc291bmRzW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVyU291cmNlKHRoaXMuc291bmRzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyAnbm8gbG9hZGVkIHNvdW5kIGNhbGxlZCBcIicgKyBuYW1lICsgJ1wiJztcbiAgICAgICAgfTtcbiAgICAgICAgU291bmRTZXJ2aWNlLnByb3RvdHlwZS5nZXRCdWZmZXJTb3VyY2UgPSBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgICAgIHZhciBidWZmZXJTb3VyY2U7XG4gICAgICAgICAgICBidWZmZXJTb3VyY2UgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgICAgICBidWZmZXJTb3VyY2UuYnVmZmVyID0gc291bmQuYnVmZmVyO1xuICAgICAgICAgICAgYnVmZmVyU291cmNlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXJTb3VyY2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTb3VuZFNlcnZpY2U7XG4gICAgfSkoKTtcbiAgICBBbmd1bGFyU291bmQuU291bmRTZXJ2aWNlID0gU291bmRTZXJ2aWNlO1xufSkoQW5ndWxhclNvdW5kIHx8IChBbmd1bGFyU291bmQgPSB7fSkpO1xuYW5ndWxhci5tb2R1bGUoJ21jd2ViYi5hbmd1bGFyLXNvdW5kJywgW10pLnNlcnZpY2UoJ1NvdW5kU2VydmljZScsIEFuZ3VsYXJTb3VuZC5Tb3VuZFNlcnZpY2UpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9