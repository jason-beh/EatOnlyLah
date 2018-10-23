$(document).ready(function() {
  // change formdata to json format
  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }

  $('form').submit(function(e) {
    e.preventDefault();
    var data = getFormData($(this));
    var bmr;
    if (data.gender == 'male') {
      console.log('male');
      bmr = 66 + 13.75 * data.weight + 5 * data.height - 6.8 * data.age;
    } else {
      console.log('female');
      bmr = 655 + 9.6 * data.weight + 1.8 * data.height - 4.7 * data.age;
    }
    switch (data.activity) {
      case 'lightly-active':
        bmr *= 1.1;
        console.log('lightly');
        break;
      case 'moderately-active':
        bmr *= 1.275;
        break;
      case 'very-active':
        bmr *= 1.35;
        break;
      case 'extra-active':
        bmr *= 1.525;
        break;
      default:
        break;
    }

    switch (data.goal) {
      case 'build-muscle':
        bmr += 200;
        console.log('muscle');
        break;
      case 'lose-fat':
        bmr -= 200;
        console.log('lose-fat');
        break;
      case 'maintainence':
        bmr -= 100;
        console.log('maintainence');
        break;
      default:
        break;
    }

    var finalBMR = Math.round(bmr);
    console.log(bmr);
    console.log(finalBMR);
    $('.bmr-form').hide();
    $('.bmr-results').css('display', 'block');
    $('.bmr-results-content')
      .children('h6')
      .text(`${finalBMR} calories`);

    setTimeout(function() {
      $('.bmr-results-content').css('display', 'block');
      $('.spinner').hide();
    }, 2000);
  });

  $('.bmr-option-button').click(function() {
    $(this)
      .siblings('.bmr-option-button')
      .removeClass('active');
    $(this).addClass('active');
    var text = $(this)
      .children('span')[0]
      .textContent.toLowerCase()
      .replace(' ', '-');
    $(this)
      .siblings('select')
      .children('option')
      .removeAttr('selected');
    console.log();
    $(`[value=${text}]`).attr('selected', 'true');
  });

  $('.bmr-modal-trigger').click(function() {
    $('.bmr-modal').addClass('active');
  });

  $('.bmr-modal-close').click(function() {
    $('.bmr-modal').removeClass('active');
  });

  $('.bmr-modal').mouseup(function(e) {
    var container = $('.bmr-modal');
    if (container.is(e.target) && container.has(e.target).length === 0) {
      $('.bmr-modal').removeClass('active');
    }
  });
});
