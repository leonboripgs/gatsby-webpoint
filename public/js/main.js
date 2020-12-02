function getDate(){
    var today = new Date();
    var year = today.getFullYear();
    document.getElementById("currentYear").innerHTML = year;
  }
  getDate();

  // Tabs and Tabs Pannel

  // const navTabs = document.getElementById('nav-tab');

  // navTabs.addEventListener('click', onTabChange, false);

  // function onTabChange(event) {
  //   event.preventDefault();
  //   const activeTabs = document.querySelectorAll('.active');

  //   //deactivate the current active tabs and panel.
  //   activeTabs.forEach( tab => {
  //     tab.className = tab.className.replace('active', '');
  //   })

  //   //activate the selected tabs and panel.
  //   event.target.parentElement.className += ' active';

  //   // event.target.href.split('#')[1]

  //   document.getElementById(event.target.href.split('#')[1]).className += ' active';

  // }

  // Popup Modal
  
  const elements = document.querySelectorAll('.open');
  const modals = document.querySelectorAll('#modal');
  const body = document.querySelector('body');

  elements.forEach((element, index) => {
    
    element.addEventListener('click', (event) => {
      console.log(event);
      switch(index) {
        case 0:
          body.style.overflowY='hidden';
          return modals[0].style.display='flex';
        case 1:
          body.style.overflowY='hidden';
          return modals[1].style.display='flex';
        case 2:
          body.style.overflowY='hidden';
          return  modals[2].style.display='flex';
        case 3:
          body.style.overflowY='hidden';
          return modals[3].style.display='flex';
        case 4:
          body.style.overflowY='hidden';
          return  modals[4].style.display='flex';
        case 5:
          body.style.overflowY ='hidden';
          return modals[5].style.display='flex';
        case 6:
          body.style.overflowY ='hidden';
          return modals[6].style.display='flex';
        case 7:
          body.style.overflowY ='hidden';
          return modals[7].style.display='flex';   
        case 8:
          body.style.overflowY ='hidden';
          return modals[8].style.display='flex';
        case 9:
          body.style.overflowY ='hidden';
          return modals[9].style.display='flex';
        case 10:
          body.style.overflowY ='hidden';
          return modals[10].style.display='flex';  
        case 11:
          body.style.overflowY ='hidden';
          return modals[11].style.display='flex'; 
        case 12:
          body.style.overflowY ='hidden';
          return modals[12].style.display='flex';
        case 13:
            body.style.overflowY ='hidden';
            return modals[13].style.display='flex';                      
        default:
          return;
      }
    })
  })
  const closeModal = document.querySelectorAll('#modal-close');

  closeModal.forEach( element => {
    element.addEventListener('click', (event) => {
      let parentElement = event.target.parentElement.parentElement;
      parentElement.style.display='none';
      body.style.overflowY='scroll';
    })
  })

// Notification
const formSubmitNotification = (data) => {
  const notify = document.getElementById('notify');
  const alertMsgSuccess = 'Form Submitted Successfully!!';
  const alertMsgCaptchaFailed = 'Failed Captcha Verification';
  const alertMsgCaptchaSelect = 'Please select Captcha';
  

  if(data.success === false && data.msg === 'Failed Captcha Verification'){
    notify.innerHTML = alertMsgCaptchaFailed;
    return notify.style.cssText = "background-color: #f8d7da; color: #721c24; display: flex;";
  }
  else if(data.success === false && data.msg === 'Please Select Captcha'){
    notify.innerHTML = alertMsgCaptchaSelect;
    return notify.style.cssText = "background-color: #f8d7da; color: #721c24; display: flex;";
  }

  if(data.success === true) {
    notify.innerHTML = alertMsgSuccess;
    notify.style.cssText = "background-color: #d4edda; color: #155724; display: flex;";
    setTimeout(() => {
      return location.reload();
    }, 5000)
  }
}


//Open respective website on thumbnail image click
function imageClick(url) {
  window.open(url, '_blank');
}

//handle captcha submission;
const submitForm = (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const companyname = document.querySelector('#companyname').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;
  const captcha = document.querySelector('#g-recaptcha-response').value;
  fetch('/formsubmit', {
    method: 'POST',
    Accept: 'application/json, text/plain, */*',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      captcha : captcha,
      name: name,
      companyname: companyname,
      email: email,
      message: message
    })
  })
  .then(resp => resp.json())
  .then(data => {
    return formSubmitNotification(data);
  })
  
}

document.getElementById('contact-form').addEventListener('submit', submitForm);
