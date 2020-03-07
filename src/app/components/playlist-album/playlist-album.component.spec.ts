import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistAlbumComponent } from './playlist-album.component';

describe('PlaylistAlbumComponent', () => {
  let component: PlaylistAlbumComponent;
  let fixture: ComponentFixture<PlaylistAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
