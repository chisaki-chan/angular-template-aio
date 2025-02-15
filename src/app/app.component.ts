import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'it-service';

  async ngOnInit() {
    document.body.scrollLeft = 0;
    console.log('AppRoutingModule');
    // check notification permission
    if (Notification.permission !== 'granted') {
      const button = document.createElement('button');
      button.innerHTML = '<i class="bx bxs-bell"></i> &nbsp;Ask for notification permission';
      button.style.position = 'fixed';
      button.style.bottom = '10px';
      button.style.right = '10px';
      button.style.zIndex = '9999';
      button.classList.add('btn', 'btn-primary');
      button.onclick = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('Hi there!', {
            body: 'Some amazing notifications are going to amaze you soon!',
          });
          button.style.display = 'none';
        }
      };
      document.body.appendChild(button);
    }

    // create a floating button to ask for notification permission
  }
}
