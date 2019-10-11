$(document).ready(function() {
  var sale = 0.85;
  var s = 0;
  var type = 0;
  var index = 0;
  var base = {
    name: "Отделка",
    v: {
      0: [2913, 2697, 2497, 2312, 2141, 1982, 1836, 1700],
      1: [10563, 10090, 8875, 8303, 7742, 7180, 6700, 6300],
      2: [20179, 19265, 16859, 15751, 14645, 13537, 12546, 11520],
      3: [30003, 28630, 25063, 23415, 21769, 20121, 18946, 17500]
    }
  };
  var d = {
    lift: {
      name: "Наличие лифта",
      v: {
        0: [56, 40, 35, 34, 33, 27, 21, 15],
        1: [76, 71, 67, 62, 58, 54, 31, 25],
        2: [400, 400, 324, 324, 305, 288, 270, 270],
        3: [532, 532, 453, 453, 427, 427, 378, 378]
      }
    },
    dem: {
      name: "Необходимость демонтажа",
      v: {
        0: [120, 108, 96, 84, 72, 60, 54, 48],
        1: [119, 109, 104, 101, 96, 93, 84, 79],
        2: [260, 250, 242, 236, 232, 228, 222, 216],
        3: [280, 275, 270, 265, 260, 255, 250, 240]
      }
    },
    oto: {
      name: "Отопление",
      v: {
        0: [25, 25, 25, 25, 25, 25, 25, 25],
        1: [146, 140, 136, 132, 128, 122, 118, 112],
        2: [846, 846, 783, 783, 718, 718, 654, 584],
        3: [1400, 1400, 1320, 1260, 1210, 1170, 1130, 1080]
      }
    },
    vk: {
      name: "Водоснабжение и канализация",
      v: {
        0: [25, 25, 25, 25, 25, 25, 25, 25],
        1: [106, 101, 96, 91, 87, 83, 79, 75],
        2: [206, 206, 176, 176, 165, 165, 146, 146],
        3: [289, 289, 246, 246, 231, 231, 205, 205]
      }
    },
    vent: {
      name: "Вентиляция и кондиционирование",
      v: {
        0: [194, 194, 165, 165, 155, 147, 138, 138],
        1: [1068, 1068, 909, 909, 856, 806, 758, 758],
        2: [2014, 2014, 1716, 1716, 1613, 1613, 1430, 1430],
        3: [2820, 2820, 2402, 2402, 2258, 2258, 2003, 2003]
      }
    },
    el: {
      name: "Электроснабжение",
      v: {
        0: [212, 212, 180, 180, 160, 160, 151, 151],
        1: [1164, 1164, 991, 991, 933, 881, 829, 826],
        2: [2295, 2295, 1870, 1870, 1758, 1758, 1559, 1559],
        3: [3074, 3074, 2618, 2618, 2461, 2461, 2183, 2183]
      }
    }
  };

  $("#calc-remont").submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    s = Math.abs($form.find('input[name=s]').val());
    type = $form.find('input[name=type]:checked').val();
    if (s < 200) {
      index = 0;
    } else if (s < 400) {
      index = 1;
    } else if (s < 600) {
      index = 2;
    } else if (s < 800) {
      index = 3;
    } else if (s < 1000) {
      index = 4;
    } else if (s < 2500) {
      index = 5;
    } else if (s < 5000) {
      index = 6;
    } else {
      index = 7;
    }
    var sum = 0;
    for (var key in d) {
      var $cur = $('input[name=' + key + ']:checked');
      if ($cur.length !== 0 && $cur.val() === "0") {
        sum += d[key].v[type][index];
      }
    }
    sum += base.v[type][index];
    $('#c-total-0').html(number_format(sum, 2, ',', ' '));
    $('#c-total-1').html(number_format((sum * s), 2, ',', ' '));
  });
});

function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};
