#version 330 core

in vec3 textureCoords;
out vec4 out_Color;

uniform samplerCube cubeMap;
uniform samplerCube cubeMap2;
uniform float blendFactor;
uniform vec3 fogColour;

const float lowerLimit = 0.0;
const float upperLimit = 30.0;

void main(void) {
    vec4 texture1 = texture(cubeMap, textureCoords);
    vec4 texture2 = texture(cubeMap2, textureCoords);
    vec4 finalColour = mix(texture1, texture2, blendFactor);

    float factor = (textureCoords.y - lowerLimit) / (upperLimit - lowerLimit);
    factor = clamp(factor, 0.0, 1.0);
    //factor = (factor > 1.0)? 1.0 : (factor < 0.0)? 0.0 : factor;
    out_Color = mix(vec4(fogColour, 0.5), finalColour, factor);
    //out_Color = vec4(vec3(factor), 1.0);
}