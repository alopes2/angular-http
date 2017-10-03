import { ServerService } from './server.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  appName = this.serverService.getAppName();

  constructor(private serverService: ServerService) {}

  ngOnInit() {

  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSave() {
    this.serverService.storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
  }

  onGet() {
    this.serverService.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.error(error)
      )
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
