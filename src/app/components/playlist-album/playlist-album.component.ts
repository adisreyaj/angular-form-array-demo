import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { formatCode } from "../../core/helpers/prism.helper";

@Component({
  selector: "app-playlist-album",
  templateUrl: "./playlist-album.component.html",
  styleUrls: ["./playlist-album.component.scss"]
})
export class PlaylistAlbumComponent implements OnInit, OnDestroy {
  playlistForm: FormGroup;
  formListenerSubscription: Subscription;
  @ViewChild("formValue") code: ElementRef;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    /**
     * Listen to form changes for code display
     */
    this.formListenerSubscription = this.playlistForm.valueChanges.subscribe(
      data => {
        const formatted = formatCode(data);
        this.code.nativeElement.innerHTML = formatted;
      }
    );
  }

  /**
   * Getter for albums item as FormArray
   */
  get albums() {
    return this.playlistForm.get("albums") as FormArray;
  }

  /**
   * Get songs of a particular index as FormArray
   * @param albumIndex - index of the album
   */
  getSongsFormArray(albumIndex: number) {
    return this.albums.controls[albumIndex].get("songs") as FormArray;
  }

  /**
   * Get Form Controls of the songs array
   * @param albumIndex - index of the album
   */
  getSongControls(albumIndex: number) {
    return this.getSongsFormArray(albumIndex).controls;
  }

  /**
   * Add a song item to existing form array
   */
  addAlbum() {
    this.albums.push(this.getAlbumItem());
  }

  /**
   * Remove a albums item from the form array
   * @param index - index of the song item to be removed
   */
  removeAlbum(index: number) {
    this.albums.removeAt(index);
  }

  /**
   * Add song to the selected album
   * @param albumIndex - index of the album selected
   */
  addSong(albumIndex: number) {
    this.getSongsFormArray(albumIndex).push(this.getSongItem());
  }

  /**
   * Remove a song from the album
   * @param albumIndex - index of the selected album
   * @param songIndex - index of song to remove
   */
  removeSong(albumIndex: number, songIndex: number) {
    this.getSongsFormArray(albumIndex).removeAt(songIndex);
  }

  /**
   * Initialize the form
   */
  private initForm() {
    this.playlistForm = this.formBuilder.group({
      name: ["", Validators.required],
      albums: this.formBuilder.array([this.getAlbumItem()])
    });
  }

  /**
   * Create a form group for Album
   */
  private getAlbumItem() {
    return this.formBuilder.group({
      name: [],
      artist: [],
      songs: this.formBuilder.array([this.getSongItem()])
    });
  }

  /**
   * Create a form group for Song
   */
  private getSongItem() {
    return this.formBuilder.group({
      name: []
    });
  }

  private updateForm() {
    this.playlistForm.updateValueAndValidity({
      emitEvent: true
    });
    const data = this.playlistForm.value;
    console.log({ data });

    const formatted = formatCode(data);
    this.code.nativeElement.innerHTML = formatted;
  }

  ngOnDestroy() {
    this.formListenerSubscription.unsubscribe();
  }
}
