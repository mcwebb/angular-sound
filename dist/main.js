/// <reference path="../typings/tsd.d.ts" />
var AngularSound;
(function (AngularSound) {
    var Sound = (function () {
        function Sound(name, src) {
            this.name = name;
            this.src = src;
        }
        return Sound;
    })();
    var Service = (function () {
        // @ngInject
        function Service($q, $timeout) {
            this.sounds = [];
        }
        Service.$inject = ["$q", "$timeout"];
        Service.prototype.loadSound = function (sound) {
            this.sounds.push(new Sound(sound.name, sound.src));
            return this;
        };
        Service.prototype.getSound = function (name) {
            this.sounds.forEach(function (sound) {
                if (sound.name === name) {
                    return sound;
                }
            });
            throw 'no loaded sound called "' + name + '"';
        };
        return Service;
    })();
    AngularSound.Service = Service;
})(AngularSound || (AngularSound = {}));
angular.module('mcwebb.angular-sound', []).service('SoundService', AngularSound.Service);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiLCJtYWluLmpzIl0sIm5hbWVzIjpbIkFuZ3VsYXJTb3VuZCIsIkFuZ3VsYXJTb3VuZC5Tb3VuZCIsIkFuZ3VsYXJTb3VuZC5Tb3VuZC5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJTb3VuZC5TZXJ2aWNlIiwiQW5ndWxhclNvdW5kLlNlcnZpY2UuY29uc3RydWN0b3IiLCJBbmd1bGFyU291bmQuU2VydmljZS5sb2FkU291bmQiLCJBbmd1bGFyU291bmQuU2VydmljZS5nZXRTb3VuZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxJQUFPO0FBQVAsQ0FBQSxVQUFPLGNBQWE7SUFNbkJBLElBQU1BLFFBQUtBLENBQUFBLFlBQUFBO1FBSVZDLFNBSktBLE1BSU9BLE1BQU1BLEtBQUdBO1lBQ3BCQyxLQUFLQSxPQUFPQTtZQUNaQSxLQUFLQSxNQUFNQTs7UUFFYkQsT0FBQUE7O0lBRUFELElBQWFBLFVBQU9BLENBQUFBLFlBQUFBOztRQUluQkcsU0FKWUEsUUFJQUEsSUFBa0JBLFVBQTRCQTtZQUN6REMsS0FBS0EsU0FBU0E7OztRQUdmRCxRQUFBQSxVQUFBQSxZQUFBQSxVQUFVQSxPQUFhQTtZQUN0QkUsS0FBS0EsT0FBT0EsS0FDWEEsSUFBSUEsTUFBTUEsTUFBTUEsTUFBTUEsTUFBTUE7WUFHN0JBLE9BQU9BOztRQUdSRixRQUFBQSxVQUFBQSxXQUFBQSxVQUFTQSxNQUFZQTtZQUNwQkcsS0FBS0EsT0FBT0EsUUFBUUEsVUFBQUEsT0FBS0E7Z0JBQ3hCQSxJQUFJQSxNQUFNQSxTQUFTQSxNQUFNQTtvQkFDeEJBLE9BQU9BOzs7WUFJVEEsTUFBTUEsNkJBQTZCQSxPQUFPQTs7UUFFNUNILE9BQUFBOztJQXpCYUgsYUFBQUEsVUFBQUE7R0FoQlAsaUJBQUEsZUFBWTtBQTRDbkIsUUFDRSxPQUFPLHdCQUF3QixJQUMvQixRQUFRLGdCQUFnQixhQUFhO0FDZnZDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5tb2R1bGUgQW5ndWxhclNvdW5kIHtcblx0aW50ZXJmYWNlIElTb3VuZCB7XG5cdFx0bmFtZTogc3RyaW5nO1xuXHRcdHNyYzogc3RyaW5nO1xuXHR9XG5cblx0Y2xhc3MgU291bmQgaW1wbGVtZW50cyBJU291bmQge1xuXHRcdG5hbWU6IHN0cmluZztcblx0XHRzcmM6IHN0cmluZztcblxuXHRcdGNvbnN0cnVjdG9yKG5hbWUsIHNyYykge1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHRcdHRoaXMuc3JjID0gc3JjO1xuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcblx0XHRwcml2YXRlIHNvdW5kczogSVNvdW5kW107XG5cblx0XHQvLyBAbmdJbmplY3Rcblx0XHRjb25zdHJ1Y3RvcigkcTogbmcuSVFTZXJ2aWNlLCAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7XG5cdFx0XHR0aGlzLnNvdW5kcyA9IFtdO1xuXHRcdH1cblxuXHRcdGxvYWRTb3VuZChzb3VuZDogSVNvdW5kKTogU2VydmljZSB7XG5cdFx0XHR0aGlzLnNvdW5kcy5wdXNoKFxuXHRcdFx0XHRuZXcgU291bmQoc291bmQubmFtZSwgc291bmQuc3JjKVxuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Z2V0U291bmQobmFtZTogc3RyaW5nKSB7XG5cdFx0XHR0aGlzLnNvdW5kcy5mb3JFYWNoKHNvdW5kID0+IHtcblx0XHRcdFx0aWYgKHNvdW5kLm5hbWUgPT09IG5hbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gc291bmQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR0aHJvdyAnbm8gbG9hZGVkIHNvdW5kIGNhbGxlZCBcIicgKyBuYW1lICsgJ1wiJztcblx0XHR9XG5cdH1cbn1cblxuYW5ndWxhclxuXHQubW9kdWxlKCdtY3dlYmIuYW5ndWxhci1zb3VuZCcsIFtdKVxuXHQuc2VydmljZSgnU291bmRTZXJ2aWNlJywgQW5ndWxhclNvdW5kLlNlcnZpY2UpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbnZhciBBbmd1bGFyU291bmQ7XG4oZnVuY3Rpb24gKEFuZ3VsYXJTb3VuZCkge1xuICAgIHZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFNvdW5kKG5hbWUsIHNyYykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuc3JjID0gc3JjO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTb3VuZDtcbiAgICB9KSgpO1xuICAgIHZhciBTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQG5nSW5qZWN0XG4gICAgICAgIGZ1bmN0aW9uIFNlcnZpY2UoJHEsICR0aW1lb3V0KSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIFNlcnZpY2UucHJvdG90eXBlLmxvYWRTb3VuZCA9IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMucHVzaChuZXcgU291bmQoc291bmQubmFtZSwgc291bmQuc3JjKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgU2VydmljZS5wcm90b3R5cGUuZ2V0U291bmQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMuZm9yRWFjaChmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc291bmQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc291bmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyAnbm8gbG9hZGVkIHNvdW5kIGNhbGxlZCBcIicgKyBuYW1lICsgJ1wiJztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFNlcnZpY2U7XG4gICAgfSkoKTtcbiAgICBBbmd1bGFyU291bmQuU2VydmljZSA9IFNlcnZpY2U7XG59KShBbmd1bGFyU291bmQgfHwgKEFuZ3VsYXJTb3VuZCA9IHt9KSk7XG5hbmd1bGFyLm1vZHVsZSgnbWN3ZWJiLmFuZ3VsYXItc291bmQnLCBbXSkuc2VydmljZSgnU291bmRTZXJ2aWNlJywgQW5ndWxhclNvdW5kLlNlcnZpY2UpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9