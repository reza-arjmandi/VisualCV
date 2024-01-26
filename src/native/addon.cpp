#include "napi.h"

#include <memory>
#include "readImage.h"

using namespace Napi;

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["readImage"] = Napi::Function::New(env, readImage);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);