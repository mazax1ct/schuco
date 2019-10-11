var cfP = 0.4,
  cfRd = 0.6;

$(function() {
  var calcWrap = $('.js-calc-wrap'),
    calcType = calcWrap.find('.js-calc-type'),
    calcArea = calcWrap.find('.js-calc-area'),
    calcPResult = calcWrap.find('.calc-p-result'),
    calcRdResult = calcWrap.find('.calc-rd-result'),
    calcPTotal = calcWrap.find('.calc-p-total'),
    calcRdTotal = calcWrap.find('.calc-rd-total'),
    calcTotal = calcWrap.find('.calc-total');
    //pType = calcWrap.find('.print-type'),
    //pArea = calcWrap.find('.print-area');

  //calcWrap.find("select").selectbox();

  function getInputVal(input) {
    var inputVal = input.val().length == 0 ? '0' : input.val();
    return parseFloat(inputVal.replace(',', '.'));
  }

  function convert_price(price) {
    var p = price + "";
    var temp = p.split(".");
    var temp_0 = temp[0] + "";
    var temp_1 = temp[1];
    var t = temp_0.split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
    if (!!temp_1) {
      p = t + "." + temp_1;
    } else {
      p = t;
    }
    return p;
  }

  function calculate() {
    var type = calcType.find('option:selected').data('price'),
      area = getInputVal(calcArea);

    type = type.split(',');

    if (area < 1500) {
      type = type[0];
    } else if (area >= 1500 && area < 3000) {
      type = type[1];
    } else if (area >= 3000 && area < 5000) {
      type = type[2];
    } else if (area >= 5000 && area < 7000) {
      type = type[3];
    } else if (area >= 7000 && area < 10000) {
      type = type[4];
    } else if (area >= 10000 && area < 15000) {
      type = type[5];
    } else if (area >= 15000 && area < 25000) {
      type = type[6];
    } else if (area >= 25000) {
      type = type[7];
    }

    var areaSum = area * type,
      pSum = areaSum * cfP,
      rdSum = areaSum * cfRd,
      pTotal = 0,
      rdTotal = 0;

    calcPResult.each(function() {
      var persent = parseFloat($(this).data('percent'));

      if (isNaN(persent)) {
        $(this).text('-');
      } else {
        $(this).text(convert_price(pSum * persent / 100));
        pTotal += pSum * persent / 100;
      }

      calcPTotal.text(convert_price(pTotal));
    });

    calcRdResult.each(function() {
      var persent = parseFloat($(this).data('percent'));

      if (isNaN(persent)) {
        $(this).text('-');
      } else {
        $(this).text(convert_price(rdSum * persent / 100));
        rdTotal += rdSum * persent / 100;
      }

      calcRdTotal.text(convert_price(rdTotal));
    });

    //pType.text(calcType.find('option:selected').text());
    //pArea.text(area);
    calcTotal.text(convert_price(pTotal + rdTotal));
  }

  calculate();

  calcType.change(calculate);

  var timeout;

  calcArea.keyup(function() {
    clearTimeout(timeout);
    timeout = setTimeout(calculate, 500);
  });
});
