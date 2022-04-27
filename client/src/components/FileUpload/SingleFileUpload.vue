<template>

    <div :class="fileUploadWrapperClass">
        
        <input ref="fileInputRef" :name="name" type="file" :multiple="false" hidden :disabled="fileAddedStatusComputed" @change="addFileDialogWindow">

        <div 
            class="" 
            v-if="!fileAddedStatusComputed" 
            :class="[{'upload-field-class-drag': dragStatus}, uploadFieldClass]"
            @click="showDialogWindow"
            @drop.prevent="dragDrop" 
            @dragenter.prevent 
            @dragover.prevent="dragOver" 
            @dragleave="dragLeave"
            >
            {{message}}
        </div>

        <div v-else-if="loadingFile" class="row upload-row" >

            <div class="column content-column">
                <span>{{progressMessage}}</span>
                <progress :class="{'progress-full': loadingFile.progress == 100}" :value="loadingFile.progress" max="100">{{loadingFile.progress}}%</progress>

                <div class="row-min-width">
                    <button class="btn-small" @click="backUpload()">Отменить</button>
                </div>
            </div>

            <div class="column img-column">
                <img :src="loadingFile.image" alt="">
            </div>
        </div>
    </div>

</template>


<script lang="ts">
    import { defineComponent, ref, Ref, computed, onMounted, watch } from 'vue';
    import { AddFile, LoadingSingleFile, AddStatus }                 from './types';
    import { normalFileSize, readFile, getTypeFromFile }             from './utils';
    
    export default defineComponent({

        props: {
            message: {
                type   : String,
                default: 'Drop file here for upload!',
            },
            fileUploadWrapperClass: {
                type   : String,
                default: 'file-single-upload-wrapper',
            },
            uploadFieldClass: {
                type   : String,
                default: 'file-upload-field'
            },
            types: {
                type   : Array as () => Array<string>,
                default: null,
            },
            maxFileSize: {
                type   : Number,
                default: null,
            },
            name: {
                type   : String,
                default: 'file',
            },
            fileAddedStatus: {
                type   : Boolean,
                default: false,
            }
        },

        emits: ["update:file-added-status", "type-error-handler", "size-error-handler", 'load-handler', 'not-drag-and-drop-capable-error', 'back-upload-handler'],
        
        setup(props, { emit }) {

            const fileAddedStatusComputed = computed({
                get(): boolean {
                    return props.fileAddedStatus;
                },
                set(val: boolean): void {
                    if(!val) progressMessage.value = "Новая фотография загружается";
                    emit("update:file-added-status", val);
                }
            });

            const normalMaxFileSize = computed((): string => {
                if(!props.maxFileSize) throw new Error('maxFileSize is null');
                return normalFileSize(props.maxFileSize);
            });

            let progress = computed((): number => {
                if(loadingFile.value == undefined || loadingFile.value.progress == undefined) return 0;
                return loadingFile.value.progress;
            });
            
            const
                fileInputRef         = ref(null),
                uploadFieldClassDrag = computed(() => props.uploadFieldClass + '-drag');

            let
                fileInput      : HTMLInputElement,
                progressMessage: Ref<string>                   = ref("Новая фотография загружается"),  
                loadingFile    : Ref<LoadingSingleFile | null> = ref(null),
                dragStatus     : Ref<boolean>                  = ref(false);
            
            watch(() => progress.value, (state) => {
                if(state == null) return;
                if(state == 100){
                    progressMessage.value = "Фотография загружена";
                }
            });

            const
                showDialogWindow = (): void => {
                    const input: HTMLInputElement = fileInput;
                    input.click();
                },

                fromFileToLoadingFile = async (addFile: AddFile, addStatus: AddStatus): Promise<LoadingSingleFile> => {
                    
                    const
                        imagesTypes     : Array<string>        = ['.svg', '.jpeg', '.jpg', '.png'],
                        dataFile        : string | ArrayBuffer = await readFile(addFile.file),
                        clearFileName   : string               = addFile.file.name.slice(0, addFile.file.name.indexOf('.'));
                    
                    const typeFile: string = getTypeFromFile(addFile.file);
                    
                    const loadingFile: LoadingSingleFile = {
                        file      : addFile.file, 
                        progress  : addFile.progress || 0,
                        image     : imagesTypes.includes(typeFile.toLowerCase()) && typeof dataFile == "string" ? dataFile : '',
                        shortName : (clearFileName.length > 5) ? `${clearFileName.slice(0, 5)}..`: clearFileName,
                        normalType: typeFile,
                        static    : addFile.static,
                        addStatus : addStatus, 
                    };

                    return loadingFile;
                },

                addFile = async (file: File) => {
                    checkFileType(file);
                    checkFileSize(file);
                    
                    dragStatus.value              = false;
                    fileAddedStatusComputed.value = true;
                    
                    loadingFile.value = await fromFileToLoadingFile({file}, AddStatus.After);
                    emit('load-handler', loadingFile.value);
                },

                addFileDialogWindow = async (e: InputEvent): Promise<void> => {
                    const newFiles: FileList | null = (e.target as HTMLInputElement).files;
                    if(!newFiles || !newFiles.length) return;
                    if (newFiles) await addFile(newFiles[0]);
                },
                
                dragDrop = async (e: DragEvent): Promise<void> => {
                    if(e.dataTransfer == null) new Error('Error with dataTransfer');
                    const newFiles: FileList | null = e.dataTransfer!.files;
                    
                    if (newFiles) {
                        const input: HTMLInputElement = fileInput as HTMLInputElement;
                        input.files = newFiles;
                        await addFile(newFiles[0]);
                    }
                },

                dragOver = (): void => {
                    dragStatus.value = true;
                },

                dragLeave = (): void => {
                    dragStatus.value = false;
                },

                checkFileType = (file: File) => {
                    
                    let 
                        type: string = getTypeFromFile(file).toLowerCase(),
                        flag         = false;

                    props.types.forEach((allowType: string) => {
                        if(type.includes(allowType)) flag = true
                    });

                    if(!flag){
                        emit('type-error-handler', file, `File's type not belongs types: ${props.types}`);
                        throw new Error(`Unnecessary type of file ${file.name}`);
                    }
                },

                checkFileSize = (file: File) => {
                    if(file.size > props.maxFileSize) { 
                        emit('size-error-handler', file, `File's size more then ${normalMaxFileSize.value}!`);
                        throw new Error(`File ${file.name} has so big size!`);
                    }
                },
                
                determineDragAndDropCapable = () => {
                    let div: HTMLDivElement = document.createElement('div');

                    return (('draggable' in div) || ( 'ondragstart' in div && 'ondrop' in div )) &&
                        'FormData' in window && 
                        'FileReader' in window;
                },

                backUpload = () => {
                    emit('back-upload-handler');
                    fileAddedStatusComputed.value = false
                };

            onMounted(() => {
                fileInput = fileInputRef.value as any;
                fileAddedStatusComputed.value = false;

                if(!determineDragAndDropCapable()) {
                    const msg = `Browser doesn't has supporting of DRAG and DROP API`;
                    emit('not-drag-and-drop-capable-error');
                    throw new Error(msg);
                }
                
            });
            
            return {
                fileAddedStatusComputed,
                fileInputRef,
                dragStatus,
                uploadFieldClassDrag,
                loadingFile,
                progressMessage,

                showDialogWindow,
                dragDrop,
                dragOver,
                dragLeave,
                addFileDialogWindow,

                backUpload
            }
        },
    })
</script>


<style lang="scss" scoped>
    
    @mixin progress{
        display: block;
        width: 100%;
        border-radius: 10px;
    }

    progress{
        @include progress;
        appearance: none;
    }

    progress::-webkit-progress-value{
        @include progress;
        background-color: #D8E9FD;
    }

    progress::-webkit-progress-bar{
        @include progress;
        background-color: #EEEEEE;
    }

    progress::-moz-progress-bar{
        @include progress;
        background-color: #539CF2;
        border: none;
        outline: none;
    }


    .progress-full::-webkit-progress-value{
        background-color: #539CF2;
    }


    @mixin activeDropField{
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23539CF2FF' stroke-width='7' stroke-dasharray='6%2c 14' stroke-dashoffset='56' stroke-linecap='square'/%3e%3c/svg%3e");
        transition: 0.4s;
        color: #539CF2;
    }


    .file-single-upload-wrapper{
        
        height: 450px;

        .upload-row{
            width: 100%;
            grid-template-columns: 300px auto;
            column-gap: 40px;
            height: 100%;
            overflow-y: hidden;

            img{
                width: 100%;
            }

            .img-column {
                height: 100%;
                overflow-y: auto;
                row-gap: 0px;
            }

            .content-column {
                
                row-gap: 40px;

                span{
                    font-size: 24px;
                    font-weight: bold;
                }

                align-content: center;
            }
        }

        .file-single-upload-field {
            padding: 200px 150px;

            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%234D4D4DFF' stroke-width='7' stroke-dasharray='6%2c 14' stroke-dashoffset='56' stroke-linecap='square'/%3e%3c/svg%3e");
            border-radius: 15px;

            display: grid;
            justify-content: center;
            font-size: 22px;

            cursor: pointer;

            span{
                font-size: 20px;
            }

            &:hover{
                @include activeDropField;
            }
        }
        
        .upload-field-class-drag{
            @include activeDropField;
        }
    }

    button:disabled{
        background-color: #EEEEEE;
        cursor: not-allowed;
    }
</style>