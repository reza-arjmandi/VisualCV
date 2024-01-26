cmake_minimum_required(VERSION 3.15)
set(CMAKE_TOOLCHAIN_FILE "${CMAKE_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake")
set(OpenCV_DIR "${CMAKE_SOURCE_DIR}/vcpkg/installed/x64-windows/share/opencv4")
set(protobuf_DIR "${CMAKE_SOURCE_DIR}/vcpkg/installed/x64-windows/share/protobuf")
set(Protobuf_DIR "${CMAKE_SOURCE_DIR}/vcpkg/installed/x64-windows/share/protobuf")

cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

project (cv-core)
find_package(Threads REQUIRED)
find_package(protobuf CONFIG REQUIRED)
find_package(OpenCV REQUIRED COMPONENTS opencv_core opencv_highgui CONFIG)
add_definitions(-DNAPI_VERSION=4)

add_library(${PROJECT_NAME} SHARED ${CMAKE_SOURCE_DIR}/src/native/addon.cpp ${CMAKE_SOURCE_DIR}/src/native/ConvertImage.cpp ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
set_target_properties(${PROJECT_NAME} PROPERTIES LINKER_LANGUAGE CXX)
include_directories(${OpenCV_INCLUDE_DIRS})
target_link_libraries(${PROJECT_NAME} ${OpenCV_LIBS})

if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
  # Generate node.lib
  execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
endif()

# set(list_of_dlls "io.exe" "node.exe" "%(DelayLoadDLLs)")
# foreach(dll_name ${list_of_dlls})
#    set(space_separated_list "${space_separated_list} /DELAYLOAD:${dll_name}")
# endforeach()
# set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "${space_separated_list}")

include_directories(${CMAKE_JS_INC})

set(CMAKE_CXX_STANDARD 17)