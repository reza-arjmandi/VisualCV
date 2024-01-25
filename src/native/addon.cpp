#include "napi.h"

#include <memory>

using namespace Napi;

Napi::Value Sample(const Napi::CallbackInfo& info)
{
    return info.Env().Null;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["sample"] = Napi::Function::New(env, Sample);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);