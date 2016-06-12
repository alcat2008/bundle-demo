//
//  ExportModule.m
//  bundleDemo
//
//  Created by alcat on 6/3/16.
//  Copyright © 2016 alcat. All rights reserved.
//

#import "ExportModule.h"

@implementation ExportModule

RCT_EXPORT_MODULE();

    // Available as NativeModules.MyCustomModule.processString
RCT_EXPORT_METHOD(processString:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
    callback(@[[input stringByReplacingOccurrencesOfString:@"Goodbye" withString:@"Hello"]]);
}

@end
