App.Config = {

  colors: ["#ff69b4", "#000000"],

  nextColor: (function () {
    var index = 0;
    return function () {
      var result = this.colors[index];
      index = (index + 1) % this.colors.length;
      return result;
    };
  }())

};
