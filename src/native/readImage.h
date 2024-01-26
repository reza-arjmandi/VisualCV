#pragma once

#include <napi.h>
#include <vector>
#include "opencv2/imgproc.hpp"
#include "opencv2/highgui.hpp"
#include "ConvertImage.h"

using namespace Napi;
using namespace cv;

class ReadImage : public AsyncWorker {
public:
    ReadImage(Function& callback, std::string& path)
    : AsyncWorker(callback), imagePath(path) {}
    
    void Execute() override {
        auto image = imread(imagePath);
        resultImage = converter.mat2str(image);
    }

    void OnOK() override {
        HandleScope scope(Env());
        Callback().Call({Env().Null(), Napi::String::New(Env(), resultImage)});
    }
private:

    ImagemConverter converter;
    std::string imagePath;
    std::string resultImage;
};

Value readImage(const CallbackInfo& info) {
    // You need to validate the arguments here.
    Function cb = info[1].As<Function>();
    std::string in = info[0].As<Napi::String>();
    ReadImage* wk = new ReadImage(cb, in);
    wk->Queue();
    return info.Env().Undefined();
}