app = angular.module('recorderApp', [])

app.controller('MainCtrl', ['$scope', function($scope){

}]);

app.directive('recorder', function(){
  return {
    restrict: 'E',
    template: '<div><a href="" ng-click="record()">Grabar</a><br><a ng-click="stop()" href="">Parar</a><br><a ng-click="upload()" href="">Subir</a><a href="" ng-click="play()">Ejecutar</a></div>',
    link: function(scope,el,attrs){
      var recorder;
      var input;
        var audio_context;
        startUserMedia = function (stream) {
          var input = audio_context.createMediaStreamSource(stream);
          var virtualInput        = audio_context.createGain();
          input.connect(virtualInput);
          var analyserNode  = audio_context.createAnalyser();
          analyserNode.fftSize    = 2048;
          virtualInput.connect( analyserNode );
          recorder = new Recorder(virtualInput);
          var amplificationFactor = audio_context.createGain();
          amplificationFactor.gain.value     = 0.0;
          amplificationFactor.connect( audio_context.destination );
        }
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audio_context = new AudioContext;
        navigator.getUserMedia = ( navigator.getUserMedia ||
                                   navigator.webkitGetUserMedia ||
                                   navigator.mozGetUserMedia ||
                                   navigator.msGetUserMedia);
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
              console.log('No live audio input: ' + e);
            });        

      scope.record = function (){
        recorder && recorder.record();
        console.log("Grabando");
      }
      scope.play = function (){
        console.log(play);
      }
      scope.stop = function (){
        recorder && recorder.stop();
        console.log(recorder);
        recorder && recorder.exportWAV(function(blob) {
          console.log(blob);
        })
        recorder.clear();
        console.log("Parando");
      }
      scope.upload = function (){
        console.log("Subiendo");
      }
    }
  }
});
