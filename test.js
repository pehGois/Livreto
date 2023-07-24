var input = "25.01, 25.00, 100.00, -25.02"
var lines = input.split(',')

for (var number of lines){ 
    if (number < 0 || number > 100) {
        console.log("Fora de intervalo");
    } else if (number <= 25) {
      console.log("Intervalo [0,25]");
        } else if (number <= 50) {
          console.log("Intervalo (25,50]");
            } else if (number <= 75) {
              console.log("Intervalo (50,75]");
                } else {
                  console.log("Intervalo (75,100]");
    }
}